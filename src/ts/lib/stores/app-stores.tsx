import {Store} from "react-stores";
import {LocaleStore} from "./locale";
import {AppStore} from "./app";

export class AppStores {
	constructor() {
		this.locale = new Store<LocaleStore.State>(LocaleStore.initialState);
		this.app = new Store<AppStore.State>(AppStore.initialState);
	}

	public locale: Store<LocaleStore.State>;
	public app: Store<AppStore.State>;
}