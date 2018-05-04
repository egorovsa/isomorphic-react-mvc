import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppStores} from "../app/stores/app-stores";
import {AppRouter} from './router';
import {I18nextService} from "./services/i18n-service";
import {initialStateInstance} from "./services/initial-state-utils";
import '../../styl/style.styl';

const stores: AppStores = new AppStores();

window.onload = () => {
	const router: AppRouter = new AppRouter(initialStateInstance, new I18nextService(stores.locale, initialStateInstance), stores);

	ReactDOM.hydrate(
		router.router(),
		document.getElementById('app')
	);
};