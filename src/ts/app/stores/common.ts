export namespace CommonStore {
	export const name: string = 'common';

	export interface State {
		windowSize: number,
		mainMenu: any[],
		mainPage: boolean,
		mainCatalogActive: boolean,
		sideNav: boolean,
		sideNavFilters: boolean,
		sideMap: boolean,
		mapCords: string,
		mapHeader: string,
		scrollTop: number
	}

	export const initialState: State = {
		windowSize: typeof window === 'object' ? window.innerWidth : 1000,
		mainMenu: [],
		mainPage: true,
		mainCatalogActive: false,
		sideNav: false,
		sideNavFilters: false,
		sideMap: false,
		mapCords: '',
		mapHeader: '',
		scrollTop: 0
	};
}