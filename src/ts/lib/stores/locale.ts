export namespace LocaleStore {
    export const name: string = 'locale';

    export interface Language {
        name: string;
        title: string;
    }

    export interface State {
        localesList: Language[];
        currentLang: string;
    }

    export const initialState: State = {
        localesList: [],
        currentLang: null
    };
}