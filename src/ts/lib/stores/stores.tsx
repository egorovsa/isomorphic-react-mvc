import { Store } from 'react-stores';
import { LocaleStore } from './locale';
import { AppStore } from './app';

export class Stores {
    public locale: Store<LocaleStore.State>;
    public app: Store<AppStore.State>;

    constructor() {
        this.locale = new Store(LocaleStore.initialState);
        this.app = new Store(AppStore.initialState);
    }
}