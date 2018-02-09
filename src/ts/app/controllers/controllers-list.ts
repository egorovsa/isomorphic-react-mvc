import {Controllers} from "../../lib/controllers/controllers";
import {InitialStateUtils} from "../../lib/services/initial-state-utils";
import {RouterState} from "react-router";
import {I18nextService} from "../../lib/services/i18n-service";
import {StoresList} from "../stores/stores";

// import {ShopController} from "./shop-controller";

export class ControllersList extends Controllers {
	constructor(data: RouterState, initialStateInstance: InitialStateUtils, i18n: I18nextService, stores: StoresList, server: boolean) {
		super(data, initialStateInstance, i18n, stores, server);

		// this.setController('shop', ShopController);
	}
}