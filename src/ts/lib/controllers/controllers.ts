import {PagesController} from "../../app/controllers/pages-controller";
import {PageNotFoundController} from "./page-not-found-controller";
import {Controller} from "./controller";
import {InitialStateUtils} from "../services/initial-state-utils";

interface ControllerInterface {
	name: string,
	controller: Controller
}

export class Controllers {
	public controllers: ControllerInterface[] = [];

	constructor(readonly data, readonly initialStateInstance: InitialStateUtils) {
		this.data = data;

		this.setController('pages', new PagesController(data));
		this.setController('pageNotFound', new PageNotFoundController(data));
	}

	public isAction(controller: string, action: string): boolean {
		return !!this.getController(controller)[action];
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
				foundController = controller.controller;
			}
		});

		return foundController;
	}

	public setController(name: string, controller: Controller) {
		controller.initAppApi(this.initialStateInstance);

		this.controllers.push({
			name: name,
			controller: controller
		});
	}
}