import {AppComponent} from "../app/components/layouts/app";
import {PageNotFoundComponent} from "../lib/components/page-not-found";
import {AppLoadingComponent} from "../lib/components/app-loading-component";
import {CUSTOM_ROUTES} from './routes';

const config = {
	PRODUCTION_PORT: 4001,
	DEFAULT_CONTROLLER: 'pages',
	DEFAULT_ACTION: 'index',
	DEFAULT_LAYOUT_COMPONENT: AppComponent,
	DEFAULT_LOADING_COMPONENT: AppLoadingComponent,
	DEFAULT_PAGE_NOT_FOUND_CONTROLLER: 'pageNotFound',
	DEFAULT_PAGE_NOT_FOUND_COMPONENT: PageNotFoundComponent,
	TITLE: 'Isomorphic react ts',
	KEYWORDS: 'KEYWORDS',
	DESCRIPTION: 'DESCRIPTION',
	SITE_URL: 'http://localhost:4001/',
	API_URL: 'http://localhost:4001/',
	DEV_SITE_URL: '/',
	DEV_API_URL: 'http://localhost:3000/',
	CUSTOM_ROUTES: CUSTOM_ROUTES
};

if (global && global["developmentMode"]) {
	config.SITE_URL = config.DEV_SITE_URL;
	config.API_URL = config.DEV_API_URL;
}

export let CONFIG = config;
