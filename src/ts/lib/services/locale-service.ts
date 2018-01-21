import {StorageService} from "../../lib/services/storage-service";
import {LocaleStore} from "../stores/locale";
import Language = LocaleStore.Language;
import CONFIG from "../../config/config";

class Service {
	public getCurrentLang(): string {
		let storageLang = JSON.parse(StorageService.cookie.get('language'));

		if (!storageLang) {
			return this.checkExistLocales(this.detectUserLang());
		}

		return storageLang.value || CONFIG.defaultLanguage;
	}

	public checkExistLocales(browserLang: string): string {
		let exist: string = CONFIG.defaultLanguage;

		CONFIG.languages.forEach((lang: Language) => {
			if (browserLang.indexOf(lang.value) > -1) {
				exist = lang.value;
			}
		});

		return exist;
	}

	public detectUserLang() {
		if (typeof global === 'object') {
			return CONFIG.defaultLanguage;
		} else {
			if (navigator.languages != undefined) {
				return navigator.languages[0];
			} else {
				return navigator.language;
			}
		}
	}
}

export let LocaleService = new Service();
