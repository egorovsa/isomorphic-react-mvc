import {PagesStore} from "../stores/pages";
import {Api} from "../../lib/api/api";
import {CONFIG} from "../../config/config";

export class PagesApi extends Api {
	public async getPageDataBySlug(slug: string): Promise<PagesStore.Page> {
		let pages = await this.request(CONFIG.API_URL + 'local-data/pages.json', 'pages');
		let page = null;

		pages.forEach((item: PagesStore.Page) => {
			if (item.slug === slug) {
				page = item;
			}
		});

		return page;
	}

	public async getPagesMenu(): Promise<PagesStore.Page[]> {
		return await this.request(CONFIG.API_URL + 'local-data/pages.json', 'pages');
	}
}
