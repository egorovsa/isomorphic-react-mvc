import {Controllers, ControllersConstructor} from "../../lib/controllers/controllers";

export class ControllersList extends Controllers {
	constructor(constructor: ControllersConstructor) {
		super(constructor);

		// this.setController('shop', ShopController);
	}
}
