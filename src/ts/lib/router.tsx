import * as React from 'react';
import CONFIG from "../config/config";
import {Router, Route, IndexRoute, browserHistory, RouterState} from 'react-router';
import {ControllersList} from "../app/controllers/controllers-list";
import {ParsedParams, RouteUtils} from "./services/route-utils";
import {I18nextService} from "./services/i18n-service";
import {Controller} from "./controllers/controller";
import {ActionComponentNotFound} from "./view/not-found-action-component";
import {ContextWrapper} from "./view/context-wrapper";
import {AppStores} from "../app/stores/app-stores";
import {InitialStateUtils} from "./services/initial-state-utils";
import {AppActions} from "../app/actions/app-actions";
import {ControllersConstructor} from "./controllers/controllers";
import {createElement} from "react";
import {PropTypes} from 'prop-types';
import {AppStore} from "./stores/app";
import {CommonStore} from "../app/stores/common";

export class AppRouter {
	constructor(readonly initialStateInstance: InitialStateUtils, readonly i18n: I18nextService, readonly stores: AppStores) {
		this.appActions = new AppActions(stores);
	}

	public appActions: AppActions;

	public router(): JSX.Element {
		return (
			<ContextWrapper
				i18n={this.i18n}
				initialStateInstance={this.initialStateInstance}
				stores={this.stores}
				appActions={this.appActions}
				server={false}
			>
				{createElement(CONFIG.DEFAULT_LOADING_COMPONENT, {})}
				<Router history={browserHistory}>
					<Route
						path="/page_not_found"
						component={CONFIG.DEFAULT_PAGE_NOT_FOUND_COMPONENT}
						onEnter={() => {
							this.stores.app.setState({
								appLoading: false
							} as AppStore.State);
						}}
					/>

					{this.mainRoute(false)}
				</Router>
			</ContextWrapper>
		)
	}

	public mainRoute(server: boolean): JSX.Element {
		let paramsPath: string = RouteUtils.makeParamsPath();

		return (
			<Route path={paramsPath}>
				<IndexRoute
					onEnter={(data: RouterState, replace, next) => {
						this.mainProcess(data, server).then(() => {
							next();
						});
					}}
				/>
			</Route>
		);
	};

	public async mainProcess(data: RouterState, server: boolean) {
		this.stores.common.setState({
			server: server
		} as CommonStore.State);

		const controllersListConstructor: ControllersConstructor = {
			data: data,
			initialStateInstance: this.initialStateInstance,
			i18n: this.i18n,
			server: server,
			stores: this.stores,
			appActions: this.appActions
		};

		let controllers: ControllersList = new ControllersList(controllersListConstructor);
		const parsed: ParsedParams = RouteUtils.parseParams(controllers, data);

		if (!parsed.controllerName) {
			parsed.controllerName = CONFIG.DEFAULT_PAGE_NOT_FOUND_CONTROLLER;
			parsed.actionName = 'index';
		}

		let controller: Controller = controllers.getController(parsed.controllerName);

		try {
			await controller.beforeFilter(...parsed.params);
		} catch (e) {
			controller = controllers.getController(CONFIG.DEFAULT_PAGE_NOT_FOUND_CONTROLLER);
			parsed.actionName = 'index';
			await controller[parsed.actionName](...parsed.params);
			this.setResponseData(data, controller);
		}

		await controller[parsed.actionName](...parsed.params);
		this.findControllerViewComponent(controller, parsed.controllerName, parsed.actionName);
		this.setResponseData(data, controller);
	}

	public setResponseData(data: RouterState, controller: Controller, responseStatus?: number): void {
		controller.layout.defaultProps = {...controller.componentData};
		controller.component.defaultProps = {...controller.componentData};

		data.routes[0].component = controller.layout;
		data.routes[1].component = controller.component;

		data.params['metaData'] = JSON.stringify(controller.metaData);
		data.params['notFound'] = controller.notFound.toString();
		data.params['responseStatus'] = responseStatus ? responseStatus.toString() : controller.responseStatus.toString();
	}

	public findControllerViewComponent(controller: Controller, controllerName: string, actionName: string): void {
		if (!controller.component) {
			const nameOfComponent = this.capitalizeFirstLetter(actionName);

			const notFoundData = {
				nameOfComponent: nameOfComponent,
				controllerName: controllerName,
				actionName: actionName,
				viewPath: '../app/view/' + controllerName + '/' + this.camelCaseToDash(actionName) + '.tsx'
			};

			try {
				const component = require('../app/view/' + controllerName + '/' + this.camelCaseToDash(actionName) + '.tsx');

				if (component[nameOfComponent]) {
					controller.component = component[nameOfComponent];
				} else {
					controller.component = () => <ActionComponentNotFound {...notFoundData}/>;
				}
			} catch (e) {
				controller.component = () => <ActionComponentNotFound {...notFoundData}/>;
			}
		}
	}

	public capitalizeFirstLetter(text: string): string {
		return text.charAt(0).toUpperCase() + text.slice(1);
	}

	public camelCaseToDash(str: string): string {
		return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
	}
}