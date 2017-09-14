import * as React from "react";
import {CONFIG} from "../../config/config";
import objectAssign = require("object-assign");
import {AppStore} from "../stores/app";

export interface ControllerRender {
	component: React.ComponentClass<any>,
	layout: React.ComponentClass<any>,
	promises: () => Promise<any>,
	notFound?: boolean
}

export interface RenderOptions {
	promise?: Promise<any>,
	layout?: React.ComponentClass<any>
}

export class Controller {
	constructor(data) {
		this.data = data;
		this.location = data.location;
		this.query = data.location.query;
		this.hash = data.location.hash;
		this.search = data.location.search;
		this.pathname = data.location.pathname;
	}

	public data;
	public location;
	public query;
	public hash;
	public search;
	public pathname;

	public render(component: any, ...args: Array<React.ComponentClass<any> | Promise<any> | AppStore.MetaData>): ControllerRender {

		let layout: React.ComponentClass<any> = CONFIG.DEFAULT_LAYOUT_COMPONENT;

		let promises: () => Promise<any> = () => {
			return new Promise((resolve) => {
				resolve();
			});
		};

		args.map((arg: any) => {
			if (this.isPromise(arg)) {
				promises = () => {
					return arg;
				};
			} else if (arg.title || arg.description || arg.keywords) {
				this.setMetaData(arg)
			} else {
				layout = arg;
			}
		});

		return {
			component: component,
			layout: layout,
			promises: promises
		}
	}

	// protected pageNotFound(layout: React.ComponentClass<any> = CONFIG.DEFAULT_PAGE_NOT_FOUND_COMPONENT): ControllerRender {
	//
	// 	AppStore.store.setState({
	// 		pageNotFound: true,
	// 		pageNotFoundComponent: layout
	// 	} as AppStore.State);
	//
	// 	return {
	// 		notFound: true,
	// 		component: null,
	// 		layout: layout,
	// 		promises: () => {
	// 			return new Promise((resolve) => {
	// 				resolve();
	// 			})
	// 		}
	// 	}
	// }

	private isPromise(func: any): boolean {
		return typeof func.then === 'function';
	}

	protected setMetaData(metaData: AppStore.MetaData): void {
		let newMetaData: AppStore.MetaData = objectAssign({}, AppStore.store.state.metadata);

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

	protected commonFilter() {
		return new Promise((next) => {
			next();
		})
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

	public copyObject(obj: Object): Object {
		return objectAssign({}, obj);
	}
}