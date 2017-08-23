import {PagesApi} from "./pages-api";

class ApiClass {
	constructor() {
		this.pages = new PagesApi;
	}

	public pages: PagesApi;
}

export let AppApi = new ApiClass();
