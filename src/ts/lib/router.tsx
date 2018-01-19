import * as React from 'react';
import {Router, Route, IndexRoute, browserHistory, RouterState} from 'react-router';
import {ControllersList} from "../app/controllers/controllers-list";
import CONFIG from "../config/config";
import {AppStore} from "./stores/app";
import {RouteUtils} from "./services/route-utils";
import {CommonStore} from "../app/stores/common";
import {InitialStateUtils} from "./services/initial-state-utils";
import {Controller} from "./controllers/controller";

export class AppRouter {
	constructor(readonly initialStateInstance: InitialStateUtils) {
	}

	public router() {
		return (
			<Router history={browserHistory}>
				<Route path="/page_not_found" component={CONFIG.DEFAULT_PAGE_NOT_FOUND_COMPONENT} onEnter={() => {
					AppStore.store.setState({
						appLoading: false
					} as AppStore.State);
				}}/>

				{this.mainRoute(false)}
			</Router>
		)
	}

	public mainRoute = (server?: boolean): JSX.Element => {
		CommonStore.store.setState({
			server: server
		} as CommonStore.State);

		let paramsPath: string = RouteUtils.makeParamsPath();

		return (
			<Route path={paramsPath}>
				<IndexRoute onEnter={(data: RouterState, replace, next) => {
					this.mainProcess(data).then(() => {
						next();
					});
				}}
				/>
			</Route>
		);
	};

	private async mainProcess(data: RouterState) {
		const controllers = new ControllersList(data, this.initialStateInstance);
		const parsedParams = RouteUtils.parseParams(controllers, data);

		if (!parsedParams.controller) {
			parsedParams.controller = CONFIG.DEFAULT_PAGE_NOT_FOUND_CONTROLLER;
			parsedParams.action = 'index';
		}

		try {
			let controller: Controller = controllers.getController(parsedParams.controller);
			await controller.beforeFilter(...parsedParams.params);
			await controller[parsedParams.action](...parsedParams.params);
			data.routes[0].component = controller.layout;
			data.routes[1].component = () => <controller.component {...controller.componentData}/>;
			data.params['notFound'] = controller.notFound.toString();
			data.params['responseStatus'] = controller.responseStatus.toString();

			return data;
		} catch (e) {
			return e;
		}
	}
}


