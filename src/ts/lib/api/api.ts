import {InitialStateUtils} from "../services/initial-state-utils";

const fetch = require('isomorphic-fetch');

export class Api {

	constructor(protected initialStateInstance: InitialStateUtils) {
		this.initialStateInstance = initialStateInstance;
	}

	protected async request(url: string, nameOfData?: string, checkExist: boolean = true): Promise<any> {
		if (nameOfData) {
			let existsData = '';

			if (checkExist) {
				existsData = this.initialStateInstance.getDataByName(nameOfData);
			}

			if (existsData) {
				return existsData;
			} else {
				try {
					const response = await  fetch(url);
					const data = await response.json();

					if (data) {
						this.initialStateInstance.setData(nameOfData, data);
					}

					return data;
				} catch (e) {
					return Promise.reject(e);
				}
			}
		} else {
			try {
				const response = await  fetch(url);
				return await response.json();
			} catch (e) {
				return Promise.reject(e);
			}
		}
	}
}
