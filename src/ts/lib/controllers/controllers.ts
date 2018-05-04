import {RouterState} from 'react-router';
import {PagesController} from "../../app/controllers/pages-controller";
import {PageNotFoundController} from "./page-not-found-controller";
import {Controller, ControllerClass} from "./controller";
import {InitialStateUtils} from "../services/initial-state-utils";
import {I18nextService} from "../services/i18n-service";
import {AppStores} from "../../app/stores/app-stores";
import {AppActions} from "../../app/actions/app-actions";

interface ControllerInterface {
	name: string
	controller: ControllerClass
}

export interface ControllersConstructor {
	data: RouterState
	initialStateInstance: InitialStateUtils,
	i18n: I18nextService
	stores: AppStores
	appActions: AppActions
	server: boolean
}

export class Controllers {
	public controllers: ControllerInterface[] = [];
	readonly data: RouterState;
	readonly initialStateInstance: InitialStateUtils;
	readonly i18n: I18nextService;
	readonly stores: AppStores;
	readonly appActions: AppActions;
	readonly server: boolean;

	constructor(constructor: ControllersConstructor) {
		this.data = constructor.data;
		this.initialStateInstance = constructor.initialStateInstance;
		this.i18n = constructor.i18n;
		this.stores = constructor.stores;
		this.server = constructor.server;
		this.appActions = constructor.appActions;

		this.setController('pages', PagesController);
		this.setController('pageNotFound', PageNotFoundController);
	}

	public isAction(name: string, action: string): boolean {
		let controllerDefinition = null;

		this.controllers.forEach((controller: ControllerInterface) => {
			if (controller.name === name) {
				controllerDefinition = controller.controller;
			}
		});

		return typeof controllerDefinition.prototype[action] === 'function';
	}

	public isController(name: string): boolean {
		let isController = false;

		this.controllers.forEach((controller: ControllerInterface) => {
			if (controller.name === name) {
				isController = true;
			}
		});

		return isController;
	}

	public getController(controllerName: string): Controller {
		let foundController: Controller = null;

		this.controllers.forEach((controller: ControllerInterface) => {
			if (controller.name === controllerName) {
				foundController = new controller.controller(this.data);
				foundController.initAppApi(this.initialStateInstance);
				foundController.initAppI18n(this.i18n);
				foundController.initAppActions(this.appActions);
				foundController.setServerState(this.server);
				foundController.setStores(this.stores);
			}
		});

		return foundController;
	}

	public setController(name: string, controller: ControllerClass): void {
		this.controllers.push({
			name: name,
			controller: controller
		});
	}
}