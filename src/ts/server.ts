import * as express from 'express';
import * as React  from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
import {match, RouterContext} from 'react-router';
import {ControllersList} from "./app/controllers/controllers-list";
import {AppRouter} from "./lib/router";
import * as serialize from "serialize-javascript";
import {CONFIG} from "./lib/config";
import {AppStore} from "./lib/stores/app";
import {RouteUtils} from "./lib/utils/route-utils";

const templateHtml = require("../indexServer.hbs");


const app = express();

console.log(__dirname);

app.use(express.static(path.join(__dirname, './../') + '/webroot'));

app.use((req, res, next) => {
	if (req.path.indexOf('.') >= 0) {
		return res.status(500).send();
	}

	next();
});

app.use((req, res) => {
	let routing = new AppRouter();
	let routes = routing.mainRoute(true);


	match({routes, location: req.url}, (error, nextLocation, nextState) => {
		if (!error) {
			if (nextState.params['param0'] && isControllerWebroot(nextState.params['param0'])) {
				return res.status(500).send();
			}

			if (nextLocation) {
				return res.status(301).send(nextLocation.pathname + nextLocation.search);
			}

			if (nextState) {
				if (!!nextState.params['pageNotFound']) {
					return res.status(404).send(getServerHtml(nextState));
				}

				res.writeHead(200, {'Content-Type': 'text/html'});
				return res.end(getServerHtml(nextState));
			} else {
				return get404(res);
			}
		} else {
			return get404(res);
		}
	});
});

function get404(res, layout = CONFIG.DEFAULT_PAGE_NOT_FOUND_COMPONENT) {
	return res.status(404).send(getServerHtml({}, layout));
}

function getServerHtml(nextState: any, component: React.ComponentClass<any> = RouterContext): string {
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
			initialState: initialState
		}
	);
}


function isControllerWebroot(controller: string) {
	let dir = fs.readdirSync(path.resolve(__dirname, './../webroot'));

	return dir.indexOf(controller) >= 0;
}

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
	console.log(`Server listening on: ${PORT}`);
});