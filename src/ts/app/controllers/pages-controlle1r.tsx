import * as React from "react";
import {AppController} from "./app-controller";
import {SimplePageComponent} from "../components/pages/simple-component";

export class PagesController extends AppController {
	constructor(data) {
		super(data);
	}

	public simple(firstParam, secondParam) {
		let params = {
			params: firstParam,
			a: secondParam,
		};

		return this.render(() => <SimplePageComponent {...params}/>, {
			title: 'This is a simple page',
			keywords: 'This is a simple page keywords',
			description: 'This is a simple page description'
		});
	}
}