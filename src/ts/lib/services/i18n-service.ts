import CONFIG from "../../config/config";
import * as i18next from 'i18next';
import {TranslationFunction} from "i18next";
import {LocaleStore} from "../stores/locale";
import {LocaleService} from "./locale-service";
import {StorageService} from "./storage-service";
import {ApiEndpoints} from "../../app/api/app-api";
import {InitialStateUtils} from "./initial-state-utils";

export class I18nextService {
	private t: TranslationFunction;
	private currentLang: string;
	private serverLang: string;

	constructor(readonly initialStateInstance: InitialStateUtils) {

	}

	public setServerLanguage(headerLanguages: string[], cookieLang?: string): void {
		if (cookieLang) {
			this.serverLang = cookieLang;
		} else if (headerLanguages.length > 0) {
			this.serverLang = headerLanguages[0];
		}
	}

	public async init(lng, translation: any) {
		let resourceObj = {};

		resourceObj[lng] = {
			translation: translation && translation[lng] ? translation[lng] : {}
		};

		return await new Promise((resolve, reject) => {
			i18next.init({
				lng: lng,
				nsSeparator: '|||',
				fallbackLng: CONFIG.defaultLanguage,
				debug: false,
				resources: resourceObj
			}, (err, t) => {
				if (err) {
					reject(err);
				}

				resolve(t);
			});
		});
	}

	public translate(key: string, data?: any): string {
		if (this.t) {
			return this.t(key, data);
		} else {
			return key;
		}
	}

	public async changeLanguage(lng: string, manual?: boolean) {
		if (manual) {
			StorageService.cookie.set('language', lng);
		}

		const AppApi = new ApiEndpoints(this.initialStateInstance);

		try {
			const translations = await AppApi.locales.getLocaleByLocale(lng);
			const translationsData = {};

			translationsData[lng] = translations;
			this.t = await this.init(lng, translationsData)  as TranslationFunction;

			LocaleStore.store.setState({
				currentLang: lng
			} as LocaleStore.State)
		} catch (e) {
			console.trace('ERROR', e);
		}
	}

	public async initService() {
		this.currentLang = LocaleService.getCurrentLang(this.serverLang);

		try {
			await this.changeLanguage(this.currentLang);
		} catch (e) {
			return e;
		}
	}
}