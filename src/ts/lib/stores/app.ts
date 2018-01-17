// store.ts
import * as React from "react";
import {Store} from "react-stores";
import {CONFIG} from "../../config/config";

export namespace AppStore {

	export interface MetaData {
		title: string,
		keywords?: string,
		description?: string
	}

	// State interface
	export interface State {
		server: boolean,
		appLoading: boolean,
		appLoadingComponent: React.ComponentClass<any>,
		metadata: MetaData,
	}

	// Store's state initial values
	let initialState: State = {
		server: false,
		appLoading: false,
		appLoadingComponent: CONFIG.DEFAULT_LOADING_COMPONENT,
		metadata: {
			title: CONFIG.TITLE,
			keywords: CONFIG.KEYWORDS,
			description: CONFIG.DESCRIPTION
		},
	};

	export let store: Store<State> = new Store<State>(initialState);
}