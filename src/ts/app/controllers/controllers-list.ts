import {Controllers} from "../../lib/controllers/controllers";
import {InitialStateUtils} from "../../lib/services/initial-state-utils";
import {RouterState} from "react-router";

export class ControllersList extends Controllers {
	constructor(data: RouterState, initialStateInstance: InitialStateUtils) {
		super(data, initialStateInstance);
	}
}