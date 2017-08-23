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
		this.showMainLoading();

		CommonStore.store.setState({
			mainPage: true
		} as CommonStore.State);

		let dataProm = Promise.all([
			AppApi.pages.getPageDataById(1),
		]).then((data) => {

			PagesStore.store.setState({
				currentPage: data[0],
			}  as PagesStore.State);

			this.setMetaData({
				title: data[0].seo_title,
				description: data[0].seo_description,
				keywords: data[0].seo_keywords
			});

			this.hideMainLoading();
			return data;
		});

		return this.render(MainPageComponent, dataProm);
	}

	public index(slug) {
		this.showMainLoading();

		let curApi = slug ? AppApi.pages.getPageDataBySlug(slug) : AppApi.pages.getPageDataById(1);

		let dataPromise = curApi.then((page) => {

			PagesStore.store.setState({
				currentPage: page
			} as PagesStore.State);

			this.setMetaData({
				title: page.seo_title,
				description: page.seo_description,
				keywords: page.seo_keywords
			});

			this.hideMainLoading();
			return page;
		});

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