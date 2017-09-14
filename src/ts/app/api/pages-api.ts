import {PagesStore} from "../stores/pages";
import {Api} from "../../lib/api/api";
import {CONFIG} from "../../config/config";

export class PagesApi extends Api {

	public getPageDataBySlug(slug: string): Promise<PagesStore.Page> {

		let existsData = this.getExistState('pages');

		if (existsData) {
			if (existsData.slug === slug) {
				return new Promise((resolve) => {
					resolve(existsData)
				})
			}
		}

		return new Promise((resolve, reject) => {
			this.request(CONFIG.SITE_URL + 'local-data/pages.json', 'pages').then((data) => {
				let page: PagesStore.Page = {} as PagesStore.Page;

				data.pages.forEach((item) => {
					if (item.slug === slug) {
						page = item;
					}
				});

				resolve(page);
			});
		});
	}

	public getPageDataById(id: number): Promise<PagesStore.Page> {

		console.log('getPageDataById', document.location);
		return new Promise((resolve, reject) => {
			this.request(CONFIG.SITE_URL + 'local-data/pages.json', 'pages').then((data) => {
				let page: PagesStore.Page = {} as PagesStore.Page;

				data.pages.forEach((item) => {
					if (item.id === id) {
						page = item;
					}
				});

				resolve(page);
			});
		});
	}

	public getMainMenu(): Promise<PagesStore.Page> {
		return new Promise((resolve, reject) => {
			this.request(CONFIG.SITE_URL + 'local-data/pages.json', 'pagesMenu').then((data) => {
				resolve(data);
			});
		});
	}

}
