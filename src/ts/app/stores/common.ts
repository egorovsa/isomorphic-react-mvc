// store.ts
import {Store} from "react-stores";

export namespace CommonStore {

	// State interface
	export interface State {
		mainMenu: any[],
		staticData: any,
		mainPage: boolean,
		sideNav: boolean,
		sideMap: boolean,
		mapCords: string,
		mapHeader: string
	}

	// Store's state initial values
	let initialState: State = {
		mainMenu: [],
		staticData: {},
		mainPage: true,
		sideNav: false,
		sideMap: false,
		mapCords: '',
		mapHeader: ''
	};

	export let store: Store<State> = new Store<State>(initialState);
}