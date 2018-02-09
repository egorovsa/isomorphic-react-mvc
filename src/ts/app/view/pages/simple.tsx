import * as React from 'react';
import {Store, StoreComponent} from "react-stores";
import {PagesStore} from "../../stores/pages";

import SyntaxHighlighter from 'react-syntax-highlighter';
import {vs2015} from 'react-syntax-highlighter/dist/styles/hljs';

export interface Props {
	test: string
}

export interface State {

}

export class Simple extends React.Component<Props, State> {
	public render() {
		return (
			<div className="container">
				<div className="page-content">
					<h1>Creating to simple page {this.props.test}</h1>
					<span className="list-item light">Open pages controller</span>
					<SyntaxHighlighter language='typescript' style={vs2015}>
						{"/ts/app/controllers/pages-controller.ts"}
					</SyntaxHighlighter>

					<span className="list-item light">and create a new method</span>

					<h2>Sync methods:</h2>
					<SyntaxHighlighter language='typescript' style={vs2015}>
						{
							'import * as React from "react";\n' +
							'import {AppController} from "./app-controller";\n' +
							'\n' +
							'export class PagesController extends AppController {\n' +
							'\tconstructor(data) {\n' +
							'\t\tsuper(data);\n' +
							'\t}\n' +
							'\n' +
							'\tpublic index(test) {\n' +
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
							'\t\t});' +
							'\n' +
							'\t}' +
							'\n' +
							'}' +
							'\n'
						}
					</SyntaxHighlighter>
					<span className="list-item light">By the way firstParam and secondParam went from the url "/pages/simple/1/a/param"</span>

					<h2>Async methods:</h2>
					<SyntaxHighlighter language='typescript' style={vs2015}>
						{
							'import * as React from "react";\n' +
							'import {AppController} from "./app-controller";\n' +
							'\n' +
							'export class PagesController extends AppController {\n' +
							'\tconstructor(data) {\n' +
							'\t\tsuper(data);\n' +
							'\t}\n' +
							'\n' +
							'\tpublic async index(slug) {\n' +
							'\t\tthis.showMainLoading();\n' +
							'\n' +
							'\t\tif (slug) {\n' +
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
							'\t}' +
							'\n' +
							'\n' +
							'}'
						}
					</SyntaxHighlighter>

					<span className="list-item light">
						Then you have to make a View part for the method, just make a simple react component<br/>
						According to our conventions the view file has to has the same name as action with capitalized first letter,<br/>
						and the path of the view file:
					</span>

					<SyntaxHighlighter language='typescript' style={vs2015}>
						{
							'/ts/app/view/pages/index.tsx'
						}
					</SyntaxHighlighter>

					<span className="list-item light">
						Where pages is the name of controller and index the name of action
					</span>

					<SyntaxHighlighter language='typescript' style={vs2015}>
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
							'export class Index extends React.Component<Props, State> {\n' +
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