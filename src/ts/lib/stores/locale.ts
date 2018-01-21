import {Store} from "react-stores";

export namespace LocaleStore {
	export interface Language {
		value: string,
		title: string
	}

	export interface State {
		localesList: Language[],
		currentLang: string
	}

	const initialState: State = {
		localesList: [],
		currentLang: null
	};

	export let store: Store<State> = new Store<State>(initialState);
}