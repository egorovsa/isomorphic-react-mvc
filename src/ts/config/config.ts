import {AppComponent} from "../app/components/layouts/app";
import {PageNotFoundComponent} from "../lib/components/page-not-found";
import {AppLoadingComponent} from "../lib/components/app-loading-component";
import {CUSTOM_ROUTES} from './routes';
import {USER_AGENT_BLOCK} from "./user-agent-blocks";

const config = {
	PRODUCTION_PORT: 4002,
	GZIP_BY_EXPRESS: false,
	DEFAULT_CONTROLLER: 'pageNotFound',
	DEFAULT_ACTION: 'index',
	DEFAULT_LAYOUT_COMPONENT: AppComponent,
	DEFAULT_COMPONENT: PageNotFoundComponent,
	DEFAULT_LOADING_COMPONENT: AppLoadingComponent,
	DEFAULT_PAGE_NOT_FOUND_CONTROLLER: 'pageNotFound',
	DEFAULT_PAGE_NOT_FOUND_COMPONENT: PageNotFoundComponent,
	TITLE: 'Isomorphic React MVC framework',
	NOT_FOUND_TITLE: 'Страница не найдена',
	KEYWORDS: 'Isomorphic react ts',
	DESCRIPTION: 'Isomorphic react ts',
	SITE_URL: '/',
	API_URL: 'http://localhost:4002/',
	DEV_SITE_URL: '/',
	DEV_API_URL: '/',
	CUSTOM_ROUTES: CUSTOM_ROUTES,
	USER_AGENT_BLOCK: USER_AGENT_BLOCK,
	SERVER_REWRITE: [],
	APP_VERSION: 1,
	VENDOR_VERSION: 1,
	defaultLanguage: 'en',
	languages: require('../../../languages.json'),
};

if (global && global["developmentMode"]) {
	config.SITE_URL = config.DEV_SITE_URL;
	config.API_URL = config.DEV_API_URL;
}

export default config;
