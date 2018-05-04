import {AppComponent} from "../app/view/layouts/app";
import {CUSTOM_ROUTES} from './routes';
import {USER_AGENT_BLOCK} from "./user-agent-blocks";
import {PageNotFoundComponent} from "../lib/view/page-not-found";
import {AppLoadingComponent} from "../lib/view/app-loading-component";

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
	NOT_FOUND_TITLE: 'Страница не найдена - Интермаг33',
	KEYWORDS: 'Isomorphic react ts',
	DESCRIPTION: 'Isomorphic react ts',
	// production site and API url
	SITE_URL: 'http://localhost:4002/',
	API_URL: 'http://localhost:4002/',
	// client development site and API url
	DEV_SITE_URL: '/',
	DEV_API_URL: '/',
	// server side site and API url
	DEV_SERVER_SITE_URL: '/',
	DEV_SERVER_API_URL: '/',
	CUSTOM_ROUTES: CUSTOM_ROUTES,
	USER_AGENT_BLOCK: USER_AGENT_BLOCK,
	SERVER_REWRITE: [],
	APP_VERSION: 1,
	VENDOR_VERSION: 1,
	defaultLanguage: 'en',
	languages: require('../../../languages.json'),
};

if ((typeof window === 'object' && window["developmentMode"])) {
	config.SITE_URL = config.DEV_SITE_URL;
	config.API_URL = config.DEV_API_URL;
}

if (
	(process && process.env.DEVELOP) ||
	(typeof window === 'object' && window['_INITIAL_STATE_'] && window['_INITIAL_STATE_']['serverDev'])) {
	config.SITE_URL = config.DEV_SERVER_SITE_URL;
	config.API_URL = config.DEV_SERVER_API_URL;
}

export default config;

