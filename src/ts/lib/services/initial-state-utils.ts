export class InitialStateUtils {
	public initialState = {};

	constructor() {
		if (typeof window === 'object' && window["_INITIAL_STATE_"]) {
			this.initialState = window["_INITIAL_STATE_"];
		}
	}

	public setData(nameOfData: string, data: any): void {
		this.initialState[nameOfData] = data;
	}

	public getDataByName(nameOfData: string): any {
		if (this.initialState[nameOfData]) {
			return this.initialState[nameOfData];
		} else {
			return false
		}
	}

	public cleanInitialState() {
		this.initialState = null;
	}
}

export const initialStateInstance = new InitialStateUtils();