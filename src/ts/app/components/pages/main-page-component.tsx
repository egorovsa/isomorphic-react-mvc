import * as React from 'react';
import {Store, StoreComponent} from "react-stores";
import {CommonStore} from "../../stores/common";
import {PagesStore} from "../../stores/pages";

import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/dist/styles/hljs';
import {UII18nText} from "../../../lib/components/ui-i18n-component";

export interface Props {

}

export interface State {
}

export interface StoresState {
	common: Store<CommonStore.State>,
	pages: Store<PagesStore.State>
}

export class MainPageComponent extends StoreComponent<Props, State, StoresState> {
	constructor() {
		super({
			common: CommonStore.store,
			pages: PagesStore.store
		});
	}

	public render() {


		return (
			<div>
				<div className="container">
					<div className="page-content">
						<h1>
							<UII18nText id={"OVERVIEW"}/>
						</h1>

						<div className="list-item">
							<a href="https://github.com/egorovsa/react-isomorphic-boilerplate">View on the GitHub</a>
						</div>

						<div className="list-item">
							This is a simple React isomorphic framework to make a simple websites with React
							technologies.
							<br/>
							<br/>
							It uses a standart Model View Controller pattern, but here is using a FLUX method for model.
						</div>

						<h1>How to install and start</h1>

						<h3>With Yarn</h3>
						<SyntaxHighlighter language='bash' style={docco}>
							{
								'//Install packages\n' +
								'$ yarn\n' +
								'\n' +
								'//Start to run development\n' +
								'$ yarn dev\n'
							}
						</SyntaxHighlighter>
						<br/><br/>

						<h3>With npm</h3>
						<SyntaxHighlighter language='bash' style={docco}>
							{
								'//Install packages\n' +
								'$ npm i\n' +
								'\n' +
								'//Start to run development\n' +
								'$ npm run dev\n'
							}
						</SyntaxHighlighter>

						<div className="list-item">
							After that just open http://localhost:3000 in your favorite browser
						</div>

						<h1>How to build</h1>

						<h3>With Yarn</h3>
						<SyntaxHighlighter language='bash' style={docco}>
							{
								'$ yarn build\n'
							}
						</SyntaxHighlighter>
						<br/><br/>

						<h3>With npm</h3>
						<SyntaxHighlighter language='bash' style={docco}>
							{
								'$ npm run build\n'
							}
						</SyntaxHighlighter>

						<div className="list-item">
							Than you may run:
						</div>

						<SyntaxHighlighter language='bash' style={docco}>
							{
								'$ node dist/server/server.js\n' +
								'\n' +
								'//or if you have pm2\n' +
								'\n' +
								'$ pm2 start pm2.json\n'
							}
						</SyntaxHighlighter>

						<div className="list-item">
							and open your browser http://localhost:4002 where
							4002 is default server port, you might change in in config file
						</div>

						<h1>How it works</h1>

						<div className="list-item">
							When you do a request to for instance : <span
							className="inner-highlight">http://yourSite.com/pages/simple/param1/param2</span>
							<br/>
							It means that you have to have a public method is named as <span
							className="inner-highlight">simple</span> in a the <span
							className="inner-highlight">PagesController</span>.
							<br/>
							At the time your url params will be available like the arguments of the method.
						</div>

						<SyntaxHighlighter language='javascript' style={docco}>
							{"/ts/app/controllers/page-controller.tsx "}
						</SyntaxHighlighter>

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
								'\tpublic async simple(test) {\n' +
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
								'\t\t});' +
								'\n' +
								'\t}' +
								'\n' +
								'}' +
								'\n'
							}
						</SyntaxHighlighter>
					</div>
				</div>
			</div>
		);
	}
}