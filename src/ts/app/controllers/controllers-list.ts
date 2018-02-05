import {Controllers} from "../../lib/controllers/controllers";
import {InitialStateUtils} from "../../lib/services/initial-state-utils";
import {RouterState} from "react-router";
import {I18nextService} from "../../lib/services/i18n-service";

export class ControllersList extends Controllers {
	constructor(data: RouterState, initialStateInstance: InitialStateUtils, i18n: I18nextService) {
		super(data, initialStateInstance, i18n);
	}
}