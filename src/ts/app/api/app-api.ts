import {PagesApi} from "./pages-api";
import {InitialStateUtils} from "../../lib/services/initial-state-utils";
import {LocalesApi} from "./locales-api";

export class ApiEndpoints {
	constructor(initialStateInstance: InitialStateUtils) {
		this.pages = new PagesApi(initialStateInstance);
		this.locales = new LocalesApi(initialStateInstance);
	}

	public pages: PagesApi;
	public locales: LocalesApi;
}