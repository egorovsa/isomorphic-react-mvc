import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppRouter} from './router';
import {Store, StoreComponent} from "react-stores";
import {AppStore} from "./stores/app";
import '../../styl/style.styl';
import './services/objectassign/object-assign';
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

	getLoadingPage(): JSX.Element {
		return React.createElement(this.stores.app.state.appLoadingComponent, {active: this.stores.app.state.appLoading})
	}

	public render() {
		return (
			<div> {this.getLoadingPage()} </div>
		);
	}
}

window.onload = () => {
	ReactDOM.render(
		<div>
			<MainComponent/>
			{routing.router()}
		</div>,
		document.getElementById('app')
	);
};


