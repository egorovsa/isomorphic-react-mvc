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
							'    constructor(data) {\n' +
							'        super(data);\n' +
							'    }\n' +
							'\n' +
							'    public index(test) {\n' +
							'\n' +
							'        this.set({\n' +
							'            params: test\n' +
							'        });\n' +
							'\n' +
							'\n' +
							'        this.setMetaData({\n' +
							'            title: "some SEO title",\n' +
							'            description: "some SEO description",\n' +
							'            keywords: "some SEO keywords"\n' +
							'        });' +
							'\n' +
							'    }' +
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
							'    constructor(data) {\n' +
							'        super(data);\n' +
							'    }\n' +
							'\n' +
							'    public async index(slug) {\n' +
							'        this.showMainLoading();\n' +
							'\n' +
							'        if (slug) {\n' +
							'\n' +
							'            try {\n' +
							'                const page = await AppApi.pages.getPageDataBySlug(slug);\n' +
							'\n' +
							'                this.set({\n' +
							'                    page: page\n' +
							'                });\n' +
							'\n' +
							'                this.setMetaData({\n' +
							'                    title: page.seo_title,\n' +
							'                    description: page.seo_description,\n' +
							'                    keywords: page.seo_keywords\n' +
							'                });\n' +
							'            } catch (e) {\n' +
							'                this.pageNotFound();\n' +
							'            }\n' +
							'        } else {\n' +
							'            this.pageNotFound();\n' +
							'        }\n' +
							'\n' +
							'        this.hideMainLoading();\n' +
							'    }' +
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
							'    page: PagesStore.Page\n' +
							'}\n' +
							'\n' +
							'export interface State {\n' +
							'\n' +
							'}\n' +
							'\n' +
							'export class Index extends React.Component<Props, State> {\n' +
							'    public render() {\n' +
							'        return (\n' +
							'            <div className="container pages-container">\n' +
							'                <h1>{this.props.page.name}</h1>\n' +
							'                <div className="page-content" dangerouslySetInnerHTML={{__html: this.props.page.content}}></div>\n' +
							'            </div>\n' +
							'        );\n' +
							'    }\n' +
							'}'
						}
					</SyntaxHighlighter>

				</div>
			</div>
		);
	}
}