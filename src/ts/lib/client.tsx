import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppRouter} from './router';
import {Store, StoreComponent} from "react-stores";
import {AppStore} from "./stores/app";
import {CONFIG} from "../config/config";
import '../../styl/style.styl';
import './utils/objectassign/object-assign';

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

	getLoadingPage(): JSX.Element {
		return React.createElement(this.stores.app.state.appLoadingComponent, {active: this.stores.app.state.appLoading})
	}

	getLayout(): JSX.Element {
		return (
			<span> {this.getLoadingPage()} </span>
		)
	}

	public render() {
		return (
			<div> {this.getLayout()} </div>
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


