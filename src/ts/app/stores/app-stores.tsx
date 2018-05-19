import { Store } from 'react-stores';
import { Stores } from '../../lib/stores/stores';
import { CommonStore } from './common';
import { PagesStore } from './pages';
import { ExampleStore } from './example';

export class AppStores extends Stores {
    public common: Store<CommonStore.State>;
    public pages: Store<PagesStore.State>;
    public example: Store<ExampleStore.State>;

    constructor() {
        super();

        this.common = new Store(CommonStore.initialState);
        this.pages = new Store(PagesStore.initialState);
        this.example = new Store(ExampleStore.initialState);
    }
}
