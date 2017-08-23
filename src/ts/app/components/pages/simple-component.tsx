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
					<span className="list-item">Then you have to make a View part for the method </span>
				</div>
			</div>
		);
	}
}