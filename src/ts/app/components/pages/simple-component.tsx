import * as React from 'react';
import {Store, StoreComponent} from "react-stores";
import {PagesStore} from "../../stores/pages";

import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/dist/styles';

export interface Props {
	params?: any
}

export interface State {

}

export interface StoresState {
	pages: Store<PagesStore.State>
}

export class SimplePageComponent extends StoreComponent<Props, State, StoresState> {
	constructor() {
		super({
			pages: PagesStore.store
		});
	}

	public render() {
		return (
			<div className="container">
				<div className="page-content">
					<h1>Creating to simple page{this.props.params}</h1>
					<span className="list-item">Open PagesController</span>
					<SyntaxHighlighter language='javascript' style={docco}>
						{"/ts/app/controllers/page-controller.tsx "}
					</SyntaxHighlighter>
					<span className="list-item">and create a new method</span>

					<h2>Sync methods:</h2>
					<SyntaxHighlighter language='javascript' style={docco}>
						{
							'public simple(firstParam, secondParam) {\n' +
							'\tlet params = {\n' +
							'\t\tparams: firstParam,\n' +
							'\t\ta: secondParam,\n' +
							'\t};\n' +
							'\n' +
							'\treturn this.render(() => <SimplePageComponent {...params}/>, {\n' +
							'\t\ttitle: \'This is a simple page\',\n' +
							'\t\tkeywords: \'This is a simple page keywords\',\n' +
							'\t\tdescription: \'This is a simple page description\'\n' +
							'\t});\n' +
							'}'
						}
					</SyntaxHighlighter>
					<span className="list-item">By the way firstParam and secondParam went from the url "/pages/simple/1/a/param" <br/>
						Or if you don't want to pass sync params to the view component just use</span>
					<SyntaxHighlighter language='javascript' style={docco}>
						{
							'public simple() {\n' +
							'\treturn this.render(SimplePageComponent, {\n' +
							'\t\ttitle: \'This is a simple page\',\n' +
							'\t\tkeywords: \'This is a simple page keywords\',\n' +
							'\t\tdescription: \'This is a simple page description\'\n' +
							'\t});\n' +
							'}'
						}
					</SyntaxHighlighter>

					<h2>Async methods:</h2>
					<SyntaxHighlighter language='javascript' style={docco}>
						{
							'public index(slug) {\n' +
							'\t// slug is taken from url /pages/index/slug\n' +
							'\t\n' +
							'\tthis.showMainLoading();\n' +
							'\n' +
							'\tlet curApi = slug ? AppApi.pages.getPageDataBySlug(slug) : AppApi.pages.getPageDataById(1);\n' +
							'\t\n' +
							'\t\n' +
							'\t// create a primise\t\n' +
							'\tlet dataPromise = curApi.then((page) => {\n' +
							'\n' +
							'\t\tPagesStore.store.setState({\n' +
							'\t\t\tcurrentPage: page\n' +
							'\t\t} as PagesStore.State);\n' +
							'\n' +
							'\t\t//set meta data after promise success\n' +
							'\t\tthis.setMetaData({\n' +
							'\t\t\ttitle: page.seo_title,\n' +
							'\t\t\tdescription: page.seo_description,\n' +
							'\t\t\tkeywords: page.seo_keywords\n' +
							'\t\t});\n' +
							'\n' +
							'\t\tthis.hideMainLoading();\n' +
							'\t\t\n' +
							'\t\t//REQUIRED: return promise data\n' +
							'\t\treturn page;\n' +
							'\t});\n' +
							'\n' +
							'\t// set render (renderComponent, yourAsyncDataPromise)\n' +
							'\treturn this.render(PagesComponent, dataPromise);\n' +
							'}'
						}
					</SyntaxHighlighter>

					<span className="list-item">
						Then you have to make a View part for the method <br/>
						just make a simple react component
					</span>
				</div>
			</div>
		);
	}
}