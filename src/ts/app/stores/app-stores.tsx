import {Store} from "react-stores";
import {Stores} from "../../lib/stores/stores";
import {CommonStore} from "./common";
import {PagesStore} from "./pages";

export class AppStores extends Stores {
	constructor() {
		super();

		this.common = new Store(CommonStore.initialState);
		this.pages = new Store(PagesStore.initialState);
	}

	public common: Store<CommonStore.State>;
	public pages: Store<PagesStore.State>;
}