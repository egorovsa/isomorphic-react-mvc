import * as React from "react";
import CONFIG from "../../config/config";
import {AppStore} from "../stores/app";
import {ApiEndpoints} from "../../app/api/app-api";
import {InitialStateUtils} from "../services/initial-state-utils";

export class Controller {
	constructor(data) {
		this.data = data;
		this.location = data.location;
		this.query = data.location.query;
		this.hash = data.location.hash;
		this.search = data.location.search;
		this.pathname = data.location.pathname;
		this.layout = CONFIG.DEFAULT_LAYOUT_COMPONENT;
		this.component = CONFIG.DEFAULT_COMPONENT;
		this.notFound = false;
		this.responseStatus = 200;
		this.componentData = {};
	}

	public data;
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

	public initAppApi(initialStateInstance: InitialStateUtils) {
		this.apiRequest = new ApiEndpoints(initialStateInstance);
	}

	protected setMetaData(metaData: AppStore.MetaData): void {
		let newMetaData: AppStore.MetaData = {...{}, ...AppStore.store.state.metadata};

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

		AppStore.store.setState({
			metadata: newMetaData
		} as AppStore.State);
	}

	public async beforeFilter(dataFromController?: any): Promise<any> {
		try {
			return true;
		} catch (e) {
			return e;
		}
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

	protected pageNotFound(): void {
		this.notFound = true;
		this.responseStatus = 404;
		this.component = CONFIG.DEFAULT_PAGE_NOT_FOUND_COMPONENT;
	}

	protected set(data: { [id: string]: any }) {
		this.componentData = data;
	}
}
