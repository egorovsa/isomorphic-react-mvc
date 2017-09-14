import * as React from "react";
import {PagesComponent} from "../components/pages/pages-component";
import {AppController} from "./app-controller";
import {AppApi} from '../api/app-api';
import {PagesStore} from "../stores/pages";
import {MainPageComponent} from "../components/pages/main-page";
import {CommonStore} from "../stores/common";
import {SimplePageComponent} from "../components/pages/simple-component";

export class PagesController extends AppController {
	constructor(data) {
		super(data);
	}

	public main() {
		return this.render(MainPageComponent, {
			title: 'React SVC (like MVC) isomorphic boilerplate v0.0.1',
			keywords: '',
			description: 'React isomorphic boilerplate'
		});
	}

	public index(slug) {
		// slug is taken from url /pages/index/slug

		this.showMainLoading();

		let curApi = slug ? AppApi.pages.getPageDataBySlug(slug) : AppApi.pages.getPageDataById(1);

		// create a primise
		let dataPromise = curApi.then((page) => {

			PagesStore.store.setState({
				currentPage: page
			} as PagesStore.State);

			//set meta data after promise success
			this.setMetaData({
				title: page.seo_title,
				description: page.seo_description,
				keywords: page.seo_keywords
			});

			this.hideMainLoading();

			//REQUIRED: return promise data
			return page;
		});

		// set render (renderComponent, yourAsyncDataPromise)
		return this.render(PagesComponent, dataPromise);
	}

	public simple(firstParam, secondParam) {
		let params = {
			params: firstParam,
			a: secondParam,
		};

		return this.render(() => <SimplePageComponent {...params}/>, {
			title: 'This is a simple page',
			keywords: 'This is a simple page keywords',
			description: 'This is a simple page description'
		});
	}

	public commonFilter() {
		CommonStore.store.setState({
			mainPage: false
		} as CommonStore.State);

		return super.commonFilter().then(() => {
			return new Promise((resolve) => {
				resolve();
			})
		})
	}
}