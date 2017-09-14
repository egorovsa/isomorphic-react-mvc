import * as React from 'react';
import {Router, Route, IndexRoute, browserHistory, RouterState} from 'react-router';
import {ControllersList} from "../app/controllers/controllers-list";
import {ControllerRender} from "./controllers/controller";
import {CONFIG} from "../config/config";
import objectAssign = require("object-assign");
import {AppStore} from "./stores/app";
import {RouteUtils} from "./utils/route-utils";
import {PageNotFoundComponent} from "./components/page-not-found";

export class AppRouter {

	public mainRoute(server?: boolean): JSX.Element {
		let paramsPath: string = RouteUtils.makeParamsPath();

		return (
			<Route path={paramsPath}>
				<IndexRoute onEnter={(data: RouterState, replace, next) => {
					data.params['pageNotFound'] = '';

					let controllers = new ControllersList(data);
					let parsedParams = RouteUtils.parseParams(controllers, data);

					if (!parsedParams.controller) {
						parsedParams.controller = CONFIG.DEFAULT_PAGE_NOT_FOUND_CONTROLLER;
						parsedParams.action = 'index';
						data.params['pageNotFound'] = 'true';
					}

					let commonFilter: Promise<any> = controllers[parsedParams.controller]['commonFilter'](...parsedParams.params);
					let render: ControllerRender = controllers[parsedParams.controller][parsedParams.action](...parsedParams.params);

					data.routes[0].component = render.layout ? render.layout : CONFIG.DEFAULT_LAYOUT_COMPONENT;

					if (render.component) {
						data.routes[1].component = render.component;
					}

					if (server) {
						commonFilter.then(() => {
							render.promises().then((data) => {
								next();
							});
						});
					} else {
						commonFilter.then(() => {
							render.promises();
						});

						next();
					}
				}}
				/>
			</Route>
		);
	}

	public router() {
		return (
			<Router history={browserHistory}>
				<Route path="/page_not_found" component={CONFIG.DEFAULT_PAGE_NOT_FOUND_COMPONENT} onEnter={() => {
					AppStore.store.setState({
						appLoading: false
					} as AppStore.State);
				}}/>

				{this.mainRoute()}
			</Router>
		)
	}
}


