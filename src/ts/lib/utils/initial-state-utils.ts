export class InitialStateUtils {
	static setData(nameOfData: string, data: any): void {
		if (nameOfData && typeof window === 'undefined') {
			if (!global['_INITIAL_STATE_']) {
				global['_INITIAL_STATE_'] = {}
			}

			global['_INITIAL_STATE_'][nameOfData] = data;
		} else if (nameOfData && typeof window === "object") {
			if (!window['_INITIAL_STATE_']) {
				window['_INITIAL_STATE_'] = {}
			}

			window['_INITIAL_STATE_'][nameOfData] = data;
		}
	}

	static getDataByName(nameOfData: string): any {
		let initialState = {};

		if (typeof window !== 'undefined' && window['_INITIAL_STATE_']) {
			initialState = window['_INITIAL_STATE_'];
		}
		// else if (typeof global !== 'undefined' && global['_INITIAL_STATE_']) {
		// 	initialState = global['_INITIAL_STATE_'];
		// }

		if (initialState[nameOfData]) {
			return initialState[nameOfData];
		} else {
			return null;
		}
	}
}