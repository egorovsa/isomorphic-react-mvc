import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppStore} from "./stores/app";
import {AppRouter} from './router';
import {Store, StoreComponent} from "react-stores";
import '../../styl/style.styl';
import './services/polyfills/object-assign';
import './services/polyfills/promise';
import {initialStateInstance} from "./services/initial-state-utils";
import {I18nextService} from "./services/i18n-service";
import {AppStores} from "../app/stores/app-stores";

const stores: AppStores = new AppStores();

export interface StoresState {
	app: Store<AppStore.State>
}

class MainComponent extends StoreComponent<any, any, StoresState> {
	constructor() {
		super({
			app: stores.app
		});
	}

	public render() {
		return React.createElement(this.stores.app.state.appLoadingComponent, {active: this.stores.app.state.appLoading})
	}
}

window.onload = () => {
	const router: AppRouter = new AppRouter(initialStateInstance, new I18nextService(stores.locale, initialStateInstance), stores);

	ReactDOM.hydrate(
		<>
		<MainComponent/>
		{router.router()}
		</>,
		document.getElementById('app')
	);
};