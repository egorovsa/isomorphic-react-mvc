import * as React from "react";
import {PagesComponent} from "../components/pages/pages-component";
import {AppController} from "./app-controller";
import {UtilsService} from "../services/utils-service";
import {MainPageComponent} from "../components/pages/main-page-component";
import {SimplePageComponent} from "../components/pages/simple-page-component";
import {ViewPageComponent} from "../components/pages/view-page-component";
import CONFIG from "../../config/config";

export class PagesController extends AppController {
	constructor(data) {
		super(data);
	}

	public async main() {
		this.component = MainPageComponent;

		this.setMetaData({
			title: CONFIG.TITLE
		})
	}

	public async view() {
		this.component = ViewPageComponent;

		this.setMetaData({
			title: 'Creating view layer'
		});
	}

	public async simple(test) {
		this.component = SimplePageComponent;

		this.set({
			test: test
		});

		this.setMetaData({
			title: 'How to create a simple page'
		});

		return false;
	}

	public async index(slug) {
		UtilsService.scrollToTop();
		this.showMainLoading();

		if (slug) {
			this.component = PagesComponent;

			try {
				const page = await this.apiRequest.pages.getPageDataBySlug(slug);

				this.set({
					page: page
				});

				this.setMetaData({
					title: page.seo_title,
					description: page.seo_description,
					keywords: page.seo_keywords
				});
			} catch (e) {
				this.pageNotFound();
			}
		} else {
			this.pageNotFound();
		}

		this.hideMainLoading();
	}

	public async beforeFilter(data) {
		await super.beforeFilter(data);
	}
}