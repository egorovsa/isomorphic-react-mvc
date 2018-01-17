import * as React from 'react';
import {Store, StoreComponent} from "react-stores";
import {PagesStore} from "../../stores/pages";

import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/dist/styles/hljs';

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
							'import * as React from "react";\n' +
							'import {AppController} from "./app-controller";\n' +
							'import {SimplePageComponent} from "../components/pages/simple-component";\n' +
							'\n' +
							'export class PagesController extends AppController {\n' +
							'\tconstructor(data) {\n' +
							'\t\tsuper(data);\n' +
							'\t}\n' +
							'\n' +
							'\tpublic simple(test) {\n' +
							'\t\tthis.component = SimplePageComponent;\n' +
							'\n' +
							'\t\tthis.set({\n' +
							'\t\t\tparams: test\n' +
							'\t\t});\n' +
							'\n' +
							'\n' +
							'\t\tthis.setMetaData({\n' +
							'\t\t\ttitle: "some SEO title",\n' +
							'\t\t\tdescription: "some SEO description",\n' +
							'\t\t\tkeywords: "some SEO keywords"\n' +
							'\t\t});'+
							'\n' +
							'\t}' +
							'\n' +
							'}' +
							'\n'
						}
					</SyntaxHighlighter>
					<span className="list-item">By the way firstParam and secondParam went from the url "/pages/simple/1/a/param"</span>

					<h2>Async methods:</h2>
					<SyntaxHighlighter language='javascript' style={docco}>
						{
							'import * as React from "react";\n' +
							'import {AppController} from "./app-controller";\n' +
							'import {PagesComponent} from "../components/pages/pages-component";\n' +
							'\n' +
							'export class PagesController extends AppController {\n' +
							'\tconstructor(data) {\n' +
							'\t\tsuper(data);\n' +
							'\t}\n' +
							'\n' +
							'\tpublic async index(slug) {\n' +
							'\t\tUtilsService.scrollToTop();\n' +
							'\t\tthis.showMainLoading();\n' +
							'\n' +
							'\t\tif (slug) {\n' +
							'\t\t\tthis.component = PagesComponent;\n' +
							'\n' +
							'\t\t\ttry {\n' +
							'\t\t\t\tconst page = await AppApi.pages.getPageDataBySlug(slug);\n' +
							'\n' +
							'\t\t\t\tthis.set({\n' +
							'\t\t\t\t\tpage: page\n' +
							'\t\t\t\t});\n' +
							'\n' +
							'\t\t\t\tthis.setMetaData({\n' +
							'\t\t\t\t\ttitle: page.seo_title,\n' +
							'\t\t\t\t\tdescription: page.seo_description,\n' +
							'\t\t\t\t\tkeywords: page.seo_keywords\n' +
							'\t\t\t\t});\n' +
							'\t\t\t} catch (e) {\n' +
							'\t\t\t\tthis.pageNotFound();\n' +
							'\t\t\t}\n' +
							'\t\t} else {\n' +
							'\t\t\tthis.pageNotFound();\n' +
							'\t\t}\n' +
							'\n' +
							'\t\tthis.hideMainLoading();\n' +
							'\t}'+
							'\n' +
							'\n' +
							'}'
						}
					</SyntaxHighlighter>

					<span className="list-item">
						Then you have to make a View part for the method <br/>
						just make a simple react component
					</span>

					<SyntaxHighlighter language='javascript' style={docco}>
						{
							'import * as React from \'react\';\n' +
							'import {PagesStore} from "../../stores/pages";\n' +
							'\n' +
							'export interface Props {\n' +
							'\tpage: PagesStore.Page\n' +
							'}\n' +
							'\n' +
							'export interface State {\n' +
							'\n' +
							'}\n' +
							'\n' +
							'export class PagesComponent extends React.Component<Props, State> {\n' +
							'\tpublic render() {\n' +
							'\t\treturn (\n' +
							'\t\t\t<div className="container pages-container">\n' +
							'\t\t\t\t<h1>{this.props.page.name}</h1>\n' +
							'\t\t\t\t<div className="page-content" dangerouslySetInnerHTML={{__html: this.props.page.content}}></div>\n' +
							'\t\t\t</div>\n' +
							'\t\t);\n' +
							'\t}\n' +
							'}'
						}
					</SyntaxHighlighter>
				</div>
			</div>
		);
	}
}