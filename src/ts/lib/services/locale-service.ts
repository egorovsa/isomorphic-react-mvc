import {LocaleStore} from "../stores/locale";
import Language = LocaleStore.Language;
import CONFIG from "../../config/config";
import {StorageService} from "./storage-service";

class Service {
	private serverLang: string;

	public setServerLanguage(headerLanguages: string[], cookieLang?: string): void {
		if (cookieLang) {
			this.serverLang = cookieLang;
		} else if (headerLanguages.length > 0) {
			this.serverLang = headerLanguages[0];
		}
	}

	public checkExistLocales(browserLang: string): string {
		let exist: string = CONFIG.defaultLanguage;

		CONFIG.languages.forEach((lang: Language) => {
			if (browserLang.indexOf(lang.name) > -1) {
				exist = lang.name;
			}
		});

		return exist;
	}

	public detectUserLang() {
		if (typeof window === 'object') {
			if (navigator.languages != undefined) {
				return navigator.languages[0];
			} else {
				return navigator.language;
			}
		}
	}

	public getCurrentLang(): string {
		if (this.serverLang) {
			return this.checkExistLocales(this.serverLang);
		}

		const storageLang = StorageService.cookie.get('language');

		if (!storageLang) {
			return this.checkExistLocales(this.detectUserLang());
		}

		return this.checkExistLocales(storageLang)
	}
}

export let LocaleService = new Service();
