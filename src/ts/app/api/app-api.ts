import {PagesApi} from "./pages-api";
import {InitialStateUtils} from "../../lib/services/initial-state-utils";

export class ApiEndpoints {
	constructor(initialStateInstance: InitialStateUtils) {
		this.pages = new PagesApi(initialStateInstance);
	}

	public pages: PagesApi;
}