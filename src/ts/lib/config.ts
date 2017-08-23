import {AppComponent} from "../app/components/layouts/app";
import {PageNotFoundComponent} from "./components/page-not-found";
import {AppLoadingComponent} from "./components/app-loading-component";

const config = {
	DEFAULT_CONTROLLER: 'pages',
	DEFAULT_ACTION: 'index',
	DEFAULT_LAYOUT_COMPONENT: AppComponent,
	DEFAULT_LOADING_COMPONENT: AppLoadingComponent,
	DEFAULT_PAGE_NOT_FOUND_CONTROLLER: 'pageNotFound',
	DEFAULT_PAGE_NOT_FOUND_COMPONENT: PageNotFoundComponent,
	TITLE: 'Isomorphic react ts',
	KEYWORDS: 'KEYWORDS',
	DESCRIPTION: 'DESCRIPTION',
	API_URL: '/',
	CUSTOM_ROUTES: [
		{
			path: '/',
			controller: 'pages',
			action: 'main'

		}
	]
};

export let CONFIG = config;
