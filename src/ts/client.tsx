import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppRouter} from './lib/router';
import {Store, StoreComponent} from "react-stores";
import {AppStore} from "./lib/stores/app";
import {CONFIG} from "./lib/config";
import '../styl/style.styl';

let routing = new AppRouter;

export interface StoresState {
	app: Store<AppStore.State>
}

class MainComponent extends StoreComponent<any, any, StoresState> {
	constructor() {
		super({
			app: AppStore.store
		});
	}

	getLoadindPage(): JSX.Element {
		return React.createElement(this.stores.app.state.appLoadingComponent, {active: this.stores.app.state.appLoading})
	}

	getLayout(): JSX.Element {

		return (
			<span>
				{this.getLoadindPage()}
			</span>
		)

	}

	public render() {
		return (
			<div>
				{this.getLayout()}
			</div>
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


