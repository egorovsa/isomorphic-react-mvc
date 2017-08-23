export class UtilsService {
	static isPromise(subject: Promise<any>) {
		return typeof subject.then == 'function';
	}

	static makeParamsPath(): string {
		let params: string = '';

		for (let i = 0; i < 20; i++) {
			params += `(/:param${i})`;
		}

		return params;
	}
}