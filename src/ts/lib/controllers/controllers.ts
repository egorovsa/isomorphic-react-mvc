import {RouterState} from 'react-router';
import {PagesController} from "../../app/controllers/pages-controller";
import {PageNotFoundController} from "./page-not-found-controller";
import {Controller, ControllerClass} from "./controller";
import {InitialStateUtils} from "../services/initial-state-utils";
import {I18nextService} from "../services/i18n-service";
import {StoresList} from "../../app/stores/stores";

interface ControllerInterface {
	name: string,
	controller: ControllerClass
}

export class Controllers {
	public controllers: ControllerInterface[] = [];

	constructor(private data: RouterState, private initialStateInstance: InitialStateUtils, private i18n: I18nextService, private stores: StoresList, private server: boolean) {
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