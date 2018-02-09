import {Store} from "react-stores";

export namespace PagesStore {
	export interface Page {
		id: number,
		name: string,
		seo_title: string,
		seo_description: string,
		seo_keywords: string,
		content: string,
		slug: string
	}

	export interface PagesMenu {
		id: number,
		name: string,
		slug: string,
		redirect: string
	}

	export interface State {
		currentPage: Page,
		mainMenu: PagesMenu[]
	}

	export const initialState: State = {
		currentPage: {
			id: 0,
			name: '',
			seo_title: '',
			seo_description: '',
			seo_keywords: '',
			content: '',
			slug: ''
		},
		mainMenu: []
	};
}