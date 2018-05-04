import {AppStores} from "../stores/app-stores";
import {CommonAction} from "./common-action";

export class AppActions {
	constructor(readonly stores: AppStores) {
		this.common = new CommonAction(this.stores.common);
	}

	public common: CommonAction
}