import {Controllers} from "../../lib/controllers/controllers";
import {InitialStateUtils} from "../../lib/services/initial-state-utils";
import {RouterState} from "react-router";
import {I18nextService} from "../../lib/services/i18n-service";
import {AppStores} from "../stores/app-stores";

// import {ShopController} from "./shop-controller";

export class ControllersList extends Controllers {
	constructor(data: RouterState, initialStateInstance: InitialStateUtils, i18n: I18nextService, stores: AppStores, server: boolean) {
		super(data, initialStateInstance, i18n, stores, server);

		// this.setController('shop', ShopController);
	}
}