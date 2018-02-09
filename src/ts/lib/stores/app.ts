import * as React from "react";
import {Store} from "react-stores";
import CONFIG from "../../config/config";

export namespace AppStore {
	export interface State {
		server: boolean,
		appLoading: boolean,
		appLoadingComponent: React.ComponentClass<any>,
	}

	export const initialState: State = {
		server: false,
		appLoading: false,
		appLoadingComponent: CONFIG.DEFAULT_LOADING_COMPONENT,
	};

	export let store: Store<State> = new Store<State>(initialState);
}