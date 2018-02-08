import * as React from "react";
import CONFIG from "../../config/config";
import {AppStore} from "../stores/app";
import {ApiEndpoints} from "../../app/api/app-api";
import {InitialStateUtils} from "../services/initial-state-utils";
import {I18nextService} from "../services/i18n-service";

export interface MetaData {
	title: string,
	keywords?: string,
	description?: string
}

export interface ControllerRequest {
	location: Location
	query: { [key: string]: string }
	hash: string
	search: string
	pathname: string
}

export class Controller {
	constructor(public data) {
		this.data = data;
		this.location = data.location;
		this.query = data.location.query;
		this.hash = data.location.hash;
		this.search = data.location.search;
		this.pathname = data.location.pathname;
		this.layout = CONFIG.DEFAULT_LAYOUT_COMPONENT;
		this.component = null;
		this.notFound = false;
		this.responseStatus = 200;
		this.componentData = {};

		this.request = {
			location: data.location,
			query: data.location.query,
			hash: data.location.hash,
			search: data.location.search,
			pathname: data.location.pathname
		};

		this.metaData = {
			title: CONFIG.TITLE,
			keywords: CONFIG.KEYWORDS,
			description: CONFIG.DESCRIPTION
		}
	}

	public request: ControllerRequest;
	public location;
	public query;
	public hash;
	public search;
	public pathname;
	public responseStatus: number;
	public notFound: boolean;
	public layout: React.ComponentClass<any>;
	public component: React.ComponentClass<any> | any;
	public componentData: { [id: string]: any };
	public apiRequest: ApiEndpoints;
	public metaData: MetaData;
	public i18n: I18nextService;
	public server: boolean;

	public initAppApi(initialStateInstance: InitialStateUtils) {
		this.apiRequest = new ApiEndpoints(initialStateInstance);
	}

	public initAppI18n(i18n: I18nextService): void {
		this.i18n = i18n;

		this.set({
			i18n: i18n
		});
	}

	public setServerState(server: boolean): void {
		this.server = server;

		this.set({
			server: server
		});
	}

	protected setMetaData(metaData: MetaData): void {
		let newMetaData: MetaData = metaData;

		if (metaData.title) {
			newMetaData.title = metaData.title;

			if (typeof document === 'object') {
				document.title = metaData.title;
			}
		}

		if (metaData.description) {
			newMetaData.description = metaData.description
		}

		if (metaData.keywords) {
			newMetaData.keywords = metaData.keywords
		}

		this.metaData = newMetaData;
	}

	protected hideMainLoading(): void {
		AppStore.store.setState({
			appLoading: false
		} as AppStore.State);
	}

	protected showMainLoading(): void {
		AppStore.store.setState({
			appLoading: true
		} as AppStore.State);
	}

	protected pageNotFound(status: number = 404): void {
		this.hideMainLoading();
		this.notFound = true;
		this.responseStatus = 404;
		this.component = CONFIG.DEFAULT_PAGE_NOT_FOUND_COMPONENT;
	}

	protected set(data: { [id: string]: any }) {
		this.componentData = {...this.componentData, ...data};
	}

	public async beforeFilter(...data): Promise<any> {
		try {
			await this.i18n.initService();
			return true;
		} catch (e) {
			return e;
		}
	}
}