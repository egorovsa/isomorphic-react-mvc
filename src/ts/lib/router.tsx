import * as React from 'react';
import CONFIG from "../config/config";
import {Router, Route, IndexRoute, browserHistory, RouterState} from 'react-router';
import {AppStore} from "./stores/app";
import {CommonStore} from "../app/stores/common";
import {ControllersList} from "../app/controllers/controllers-list";
import {RouteUtils} from "./services/route-utils";
import {InitialStateUtils} from "./services/initial-state-utils";
import {I18nextService} from "./services/i18n-service";
import {Controller} from "./controllers/controller";

export class AppRouter {
	public i18n: I18nextService;

	constructor(readonly initialStateInstance: InitialStateUtils) {
		this.i18n = new I18nextService(this.initialStateInstance)
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
				}}/>
			</Route>
		);
	};

	private async mainProcess(data: RouterState) {
		const controllers = new ControllersList(data, this.initialStateInstance, this.i18n);
		const parsedParams = RouteUtils.parseParams(controllers, data);

		if (!parsedParams.controller) {
			parsedParams.controller = CONFIG.DEFAULT_PAGE_NOT_FOUND_CONTROLLER;
			parsedParams.action = 'index';
		}

		let controller: Controller = controllers.getController(parsedParams.controller);

		try {
			await controller.beforeFilter(...parsedParams.params);
		} catch (e) {
			controller = controllers.getController(CONFIG.DEFAULT_PAGE_NOT_FOUND_CONTROLLER);
			parsedParams.action = 'index';
			await controller[parsedParams.action](...parsedParams.params);
			return this.responseData(data, controller);
		}

		await controller[parsedParams.action](...parsedParams.params);
		return this.responseData(data, controller);
	}

	private responseData(data: RouterState, controller: Controller, responseStatus?: number) {
		controller.layout.defaultProps = {...controller.componentData};
		controller.component.defaultProps = {...controller.componentData};
		data.routes[0].component = controller.layout;
		data.routes[1].component = controller.component;
		data.params['metaData'] = JSON.stringify(controller.metaData);
		data.params['notFound'] = controller.notFound.toString();
		data.params['responseStatus'] = responseStatus ? responseStatus.toString() : controller.responseStatus.toString();

		return data;
	}
}