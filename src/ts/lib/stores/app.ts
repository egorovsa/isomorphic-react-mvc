import * as React from "react";
import CONFIG from "../../config/config";

export namespace AppStore {
	export const name: string = 'app';

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
}