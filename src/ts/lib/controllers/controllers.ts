import {PagesController} from "../../app/controllers/pages-controller";
import {PageNotFoundController} from "./page-not-found-controller";

export class Controllers {
	public data;
	public pages;
	public pageNotFound;

	constructor(data) {
		this.data = data;
		this.pages = new PagesController(data);
		this.pageNotFound = new PageNotFoundController(data);
	}

	public isAction(controller: string, action: string): boolean {
		return !!this[controller][action];
	}

	public isController(controller: string): boolean {
		return !!this[controller];
	}
}