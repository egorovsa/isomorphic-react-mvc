import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppRouter} from './router';
import '../../styl/style.styl';
import {initialStateInstance} from "./services/initial-state-utils";
import {I18nextService} from "./services/i18n-service";
import {AppStores} from "../app/stores/app-stores";

const stores: AppStores = new AppStores();

window.onload = () => {
	const router: AppRouter = new AppRouter(initialStateInstance, new I18nextService(stores.locale, initialStateInstance), stores);

	ReactDOM.hydrate(
		router.router(),
		document.getElementById('app')
	);
};