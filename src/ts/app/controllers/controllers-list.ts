import {Controllers} from "../../lib/controllers/controllers";
import {InitialStateUtils} from "../../lib/services/initial-state-utils";

export class ControllersList extends Controllers {
	constructor(readonly data, initialStateInstance: InitialStateUtils) {
		super(data, initialStateInstance);
	}
}