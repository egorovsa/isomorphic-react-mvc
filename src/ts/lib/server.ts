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
import {CONFIG} from "../config/config";
import {AppStore} from "./stores/app";
import {InitialStateUtils} from "./utils/initial-state-utils";

const templateHtml = require("../../index.hbs");
const app = express();
app.use(compression());

app.use(express.static(path.join(__dirname, './../') + '/webroot'));

app.use((req, res, next) => {
	if (req.path.indexOf('.') >= 0) {
		return res.status(500).send();
	}

	next();
});

app.use((req, res) => {
	let userAgent = req.headers['user-agent'];
	let routing = new AppRouter();
	let routes = routing.mainRoute(true);

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
				return res.end(getServerHtml(req, nextState));
			} else {
				return get404(req, res);
			}
		} else {
			return get404(req, res);
		}
	});
});

function get404(req, res, nextState = {}, layout = CONFIG.DEFAULT_PAGE_NOT_FOUND_COMPONENT) {
	AppStore.store.setState({
		metadata: {
			title: CONFIG.NOT_FOUND_TITLE,
			keywords: CONFIG.KEYWORDS,
			description: CONFIG.DESCRIPTION
		}
	} as AppStore.State);

	return res.status(404).send(getServerHtml(req, nextState, layout));
}

function getServerHtml(req: any, nextState: any, component: React.ComponentClass<any> = RouterContext): string {
	InitialStateUtils.setData('serverUserAgent', req.headers['user-agent']);
	let componentHTML: string = ReactDOMServer.renderToString(React.createElement(component, nextState));

	let initialState: string = serialize({}, {
		isJSON: true
	});

	if (global['_INITIAL_STATE_']) {
		initialState = serialize(global['_INITIAL_STATE_'], {
			isJSON: true
		})
	}

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