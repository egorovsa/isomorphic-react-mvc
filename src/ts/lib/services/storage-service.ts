const localStorage = require('localStorage');
const jsCookie = require('js-cookie');

class LocalStorage {
    public getItem(key: string): any {
        return localStorage.getItem(key);
    }

    public setItem(key: string, value: any): void {
        value = typeof value === 'object' ? JSON.stringify(value) : value;
        localStorage.setItem(key, value);
    }
}

export interface CookieParams {
    expires?: number;
    path?: string;
}

class Cookie {
    public set(key: string, value: any, options?: CookieParams): void {
        jsCookie.set(key, value, options);
    }

    public get(key: string): string {
        return jsCookie.get(key);
    }

    public getAll(): Object {
        return jsCookie.get();
    }

    public remove(key: string, path?: string): void {
        let params = {};

        if (path) {
            params = {
                path: path
            };
        }

        jsCookie.remove(key, params);
    }
}

class Service {
    public local: LocalStorage;
    public cookie: Cookie;

    constructor() {
        this.local = new LocalStorage;
        this.cookie = new Cookie;
    }
}

export let StorageService = new Service();