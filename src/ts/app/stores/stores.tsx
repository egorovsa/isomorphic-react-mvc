import {Store} from "react-stores";
import {CommonStore} from "./common";
import {PagesStore} from "./pages";
import {AppStores} from "../../lib/stores/app-stores";

export class StoresList extends AppStores {
	constructor() {
		super();

		this.common = new Store<CommonStore.State>(CommonStore.initialState);
		this.pages = new Store<PagesStore.State>(PagesStore.initialState);
	}

	public common: Store<CommonStore.State>;
	public pages: Store<PagesStore.State>;
}