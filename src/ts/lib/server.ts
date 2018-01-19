require('source-map-support').install();
const compression = require('compression');

import * as express from 'express';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as fs from 'fs';
import * as path from 'path';
import {match, RouterContext} from 'react-router';
import {AppRouter} from "./router";
import * as serialize from "serialize-javascript";
import CONFIG from "../config/config";
import {AppStore} from "./stores/app";
import {InitialStateUtils} from "./services/initial-state-utils";
import cookieParser = require('cookie-parser');

const templateHtml = require("../../index.hbs");
const app = express();
app.use(compression());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, './../') + '/webroot'));

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (req.path.indexOf('.') >= 0) {
		return res.status(500).send();
	}

	next();
});

app.use((req: express.Request, res: express.Response) => {
	const userAgent = req.headers['user-agent'];
	const initialStateInstance = new InitialStateUtils();
	const routing = new AppRouter(initialStateInstance);
	const routes = routing.mainRoute(true);

	CONFIG.USER_AGENT_BLOCK.map((uaBlock) => {
		if (uaBlock.userAgent && userAgent.indexOf(uaBlock.userAgent) > -1) {
			if (uaBlock.block) {
				return res.status(404).send("404");
			} else {
				return res.status(301).redirect(uaBlock.redirectTo);
			}
		}
	});

	match({routes, location: req.url}, (error, nextLocation, nextState) => {
		if (!error && nextState && nextState['params']) {
			if (nextState.params['param0'] && isControllerWebroot(nextState.params['param0'])) {
				return res.status(500).send();
			}

			if (nextLocation) {
				return res.status(301).send(nextLocation.pathname + nextLocation.search);
			}

			if (nextState) {
				res.writeHead(nextState.params['responseStatus'], {'Content-Type': 'text/html'});
				return res.end(getServerHtml(req, nextState, initialStateInstance));
			} else {
				return get404(req, res);
			}
		} else {
			return get404(req, res);
		}
	});
});

function get404(req: express.Request, res: express.Response, nextState = {}, layout = CONFIG.DEFAULT_PAGE_NOT_FOUND_COMPONENT) {
	return res.status(404).send('Page not found');
}

function getServerHtml(req: express.Request, nextState: any, initialStateInstance: InitialStateUtils, component: React.ComponentClass<any> = RouterContext): string {
	// console.log(req.cookies['language'], req.headers["accept-language"]);

	initialStateInstance.setData('serverUserAgent', req.headers['user-agent']);
	const componentHTML: string = ReactDOMServer.renderToString(React.createElement(component, nextState));

	const initialState = serialize(initialStateInstance.initialState, {
		isJSON: true
	});

	return templateHtml(
		{
			componentHtml: componentHTML,
			title: AppStore.store.state.metadata.title,
			description: AppStore.store.state.metadata.description,
			keywords: AppStore.store.state.metadata.keywords,
			styleLink: '<link rel="stylesheet" href="/css/style.css">',
			initialState: '<script>window["_INITIAL_STATE_"] = ' + initialState + '</script>',
			appVersion: CONFIG.APP_VERSION,
			vendorVersion: CONFIG.VENDOR_VERSION,
			server: true
		}
	);
}

function isControllerWebroot(controller: string) {
	let dir = fs.readdirSync(path.resolve(__dirname, './../webroot'));

	return dir.indexOf(controller) >= 0;
}

const PORT = process.env.PORT || CONFIG.PRODUCTION_PORT;

app.listen(PORT, () => {
	console.log(`Server listening on: ${PORT}`);
});