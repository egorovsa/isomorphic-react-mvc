import { LocaleStore } from '../stores/locale';
import Language = LocaleStore.Language;
import CONFIG from '../../config/config';
import { StorageService } from './storage-service';

class Service {
    static detectUserLang() {
        if (typeof window === 'object') {
            if (navigator.languages !== undefined) {
                return navigator.languages[0];
            } else {
                return navigator.language;
            }
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

    public getCurrentLang(serverLang: string): string {
        if (serverLang) {
            return this.checkExistLocales(serverLang);
        }

        const storageLang = StorageService.cookie.get('language');

        if (!storageLang) {
            return this.checkExistLocales(Service.detectUserLang());
        }

        return this.checkExistLocales(storageLang);
    }
}

export let LocaleService = new Service();
