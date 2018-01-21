import {Api} from "../../lib/api/api";
import CONFIG from "../../config/config";

export class LocalesApi extends Api {
	constructor(data) {
		super(data)
	}

	public getLocaleByLocale(locale: string): Promise<any> {
		return this.request(CONFIG.API_URL + 'local-data/translations/' + locale + '.json', 'locale_' + locale);
	}
}