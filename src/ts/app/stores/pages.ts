// store.ts
import {Store} from "react-stores";

export namespace PagesStore {
	export interface Page {
		id: number,
		name: string,
		seo_title: string,
		seo_description: string,
		seo_keywords: string,
		content: string,
	}

	export interface State {
		currentPage: Page,
	}

	let initialState: State = {
		currentPage: {
			id: 0,
			name: '',
			seo_title: '',
			seo_description: '',
			seo_keywords: '',
			content: '',
		}
	};

	export let store: Store<State> = new Store<State>(initialState);
}