import {RouterState} from 'react-router';
import {PagesController} from "../../app/controllers/pages-controller";
import {PageNotFoundController} from "./page-not-found-controller";
import {Controller} from "./controller";
import {InitialStateUtils} from "../services/initial-state-utils";

interface ControllerInterface {
	name: string,
	controller: (data) => void
}

export class Controllers {
	public controllers: ControllerInterface[] = [];

	constructor(private data: RouterState, private initialStateInstance: InitialStateUtils) {
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

	public getController(name: string): Controller {
		let foundController: Controller = null;

		this.controllers.forEach((controller: ControllerInterface) => {
			if (controller.name === name) {
				foundController = new controller.controller(this.data);
				foundController.initAppApi(this.initialStateInstance);

			}
		});

		return foundController;
	}

	public setController(name: string, controller: any): void {
		this.controllers.push({
			name: name,
			controller: controller
		});
	}
}