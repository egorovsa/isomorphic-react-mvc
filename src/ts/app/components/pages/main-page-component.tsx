import * as React from 'react';
import {Store, StoreComponent} from "react-stores";
import {CommonStore} from "../../stores/common";
import {PagesStore} from "../../stores/pages";

import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/dist/styles/hljs';
import {SimplePageComponent} from "./simple-page-component";

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
						<div className="list-item">
							This is a simple React isomorphic framework to make a simple websites with React
							technologies.
							<br/>
							<br/>
							It uses a standart Model View Controller pattern, but here is using a FLUX method for model.
						</div>

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

						<span className="list-item">PagesController</span>

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
								'\t\t});'+
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