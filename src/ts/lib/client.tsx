import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppStore} from "./stores/app";
import {AppRouter} from './router';
import {Store, StoreComponent} from "react-stores";
import '../../styl/style.styl';
import './services/polyfills/object-assign';
import './services/polyfills/promise';

import {InitialStateUtils} from "./services/initial-state-utils";

let routing = new AppRouter(new InitialStateUtils);

export interface StoresState {
	app: Store<AppStore.State>
}

class MainComponent extends StoreComponent<any, any, StoresState> {
	constructor() {
		super({
			app: AppStore.store
		});
	}
	
	public render() {
		return React.createElement(this.stores.app.state.appLoadingComponent, {active: this.stores.app.state.appLoading})
	}
}

window.onload = () => {
	ReactDOM.hydrate(
		<div>
			<MainComponent/>
			{routing.router()}
		</div>,
		document.getElementById('app')
	);
};