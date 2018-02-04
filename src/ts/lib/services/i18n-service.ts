import * as i18next from 'i18next';
import {LocaleService} from "./locale-service";
import {TranslationFunction} from "i18next";
import CONFIG from "../../config/config";
import {ApiEndpoints} from "../../app/api/app-api";
import {LocaleStore} from "../stores/locale";
import {StorageService} from "./storage-service";
import {InitialStateUtils} from "./initial-state-utils";

class Service {
	private t: TranslationFunction;
	private currentLang: string;

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

		const AppApi = new ApiEndpoints(new InitialStateUtils());

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
		this.currentLang = LocaleService.getCurrentLang();

		try {
			await this.changeLanguage(this.currentLang);
		} catch (e) {
			return e;
		}
	}
}

export const I18nService = new Service();