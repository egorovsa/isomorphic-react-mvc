import * as React from "react";
import {AppController} from "../../app/controllers/app-controller";
import CONFIG from "../../config/config";

export class PageNotFoundController extends AppController {
	constructor(data) {
		super(data);
	}

	public index() {
		this.setMetaData({
			title: CONFIG.NOT_FOUND_TITLE,
			keywords: CONFIG.KEYWORDS,
			description: CONFIG.DESCRIPTION
		});

		this.pageNotFound();
	}
}