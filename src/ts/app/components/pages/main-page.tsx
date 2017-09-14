import * as React from 'react';
import {Store, StoreComponent} from "react-stores";
import {CommonStore} from "../../stores/common";
import {PagesStore} from "../../stores/pages";

import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/dist/styles';

export interface Props {

}

export interface State {
	selectedMetro: number
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
					<div className="list-item">
						This is a simple React isomorphic framework to make a simple websites with React technologies.
						<br/>
						<br/>
						It uses a standart Model View Controller pattern, but here is using a FLUX method for model.
					</div>

					<div className="list-item">
						When you do a request to for instance : <span className="inner-highlight">http://yourSite.com/pages/simple/param1/param2</span>
						<br/>
						It means that you have to have a public method is named as <span className="inner-highlight">simple</span> in a the <span className="inner-highlight">PagesController</span>.
						<br/>
						At the time your url params will be available like the arguments of the method.
					</div>

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
							'\tpublic simple(param1, param2) {\n' +
							'\t\tlet params = {\n' +
							'\t\t\tparams: param1,\n' +
							'\t\t\ta: param2,\n' +
							'\t\t};\n' +
							'\n' +
							'\t\treturn this.render(() => <SimplePageComponent {...params}/>, {\n' +
							'\t\t\ttitle: \'This is a simple page\',\n' +
							'\t\t\tkeywords: \'This is a simple page keywords\',\n' +
							'\t\t\tdescription: \'This is a simple page description\'\n' +
							'\t\t});\n' +
							'\t}\n' +
							'}'
						}
					</SyntaxHighlighter>
				</div>
			</div>
		);
	}
}