import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/dist/styles/hljs';

export interface Props {
	params?: any
}

export interface State {

}

export class View extends React.Component<Props, State> {
	public render() {
		return (
			<div className="container">
				<div className="page-content">
					<h1>Creating to simple view layer as a React component</h1>
					<span className="list-item">Open index.tsx </span>
					<SyntaxHighlighter language='javascript' style={docco}>
						{"/ts/app/view/pages/index.tsx"}
					</SyntaxHighlighter>

					<span className="list-item">and put the example there</span>

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