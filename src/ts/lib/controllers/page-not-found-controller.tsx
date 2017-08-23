import * as React from "react";
import {AppController} from "../../app/controllers/app-controller";
import {CONFIG} from "../config";

export class PageNotFoundController extends AppController {
	constructor(data) {
		super(data);
	}

	public index() {
		return this.render(CONFIG.DEFAULT_PAGE_NOT_FOUND_COMPONENT);
	}

}