import CONFIG from '../../config/config';
import * as i18next from 'i18next';
import { TranslationFunction } from 'i18next';
import { LocaleStore } from '../stores/locale';
import { LocaleService } from './locale-service';
import { StorageService } from './storage-service';
import { ApiEndpoints } from '../../app/api/app-api';
import { InitialStateUtils } from './initial-state-utils';
import { Store } from 'react-stores';

export class I18nextService {
    private t: TranslationFunction;
    private currentLang: string;
    private serverLang: string;

    constructor(
        readonly localeStore: Store<LocaleStore.State>,
        readonly initialStateInstance: InitialStateUtils
    ) {
    }

    public setServerLanguage(headerLanguages: string[], cookieLang?: string): void {
        if (cookieLang) {
            this.serverLang = cookieLang;
        } else if (headerLanguages.length > 0) {
            this.serverLang = headerLanguages[0];
        }
    }

    public async init(lng: string, translation: any): Promise<TranslationFunction> {
        let resourceObj = {};

        resourceObj[lng] = {
            translation: translation && translation[lng] ? translation[lng] : {}
        };

        return await new Promise((resolve, reject) => {
            i18next.init(
                {
                    lng: lng,
                    nsSeparator: '|||',
                    fallbackLng: CONFIG.defaultLanguage,
                    debug: false,
                    resources: resourceObj
                },
                (err: any, t: TranslationFunction) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(t);
                }
            );
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

            this.localeStore.setState({
                currentLang: lng
            } as LocaleStore.State);
        } catch (e) {
            console.trace('ERROR', e);
        }
    }

    public async initService() {
        this.currentLang = LocaleService.getCurrentLang(this.serverLang);

        try {
            if (this.serverLang) {
                await this.changeLanguage(this.currentLang);
            } else {
                this.changeLanguage(this.currentLang).then();
            }
        } catch (e) {
            return e;
        }
    }
}