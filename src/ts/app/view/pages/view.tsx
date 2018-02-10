import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {vs2015} from 'react-syntax-highlighter/dist/styles/hljs';

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
					<SyntaxHighlighter language='typescript' style={vs2015}>
						{"/ts/app/view/pages/index.tsx"}
					</SyntaxHighlighter>

					<span className="list-item">and put the example there</span>

					<SyntaxHighlighter language='javascript' style={vs2015}>
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

					<span className="list-item light">
						Have a look a few decorators we have for a view component
					</span>

					<SyntaxHighlighter language='javascript' style={vs2015}>
						{
							'// set all context provided contextWrapper\n' +
							'@setContext\n' +
							'\n' +
							'// and use it by context\n' +
							'this.context.i18n'
						}
					</SyntaxHighlighter>

					<span className="list-item light"/>

					<SyntaxHighlighter language='javascript' style={vs2015}>
						{
							'export interface ContextProps {\n' +
							'    i18n: I18nextService,\n' +
							'    initialStateInstance: InitialStateUtils\n' +
							'    stores: AppStores\n' +
							'}'
						}
					</SyntaxHighlighter>

					<span className="list-item light"/>

					<SyntaxHighlighter language='javascript' style={vs2015}>
						{
							'// pass all context params to props\n' +
							'@contextToProps\n' +
							'\n' +
							'// pass all stores params to defaultProps component as stores:AppStores\n' +
							'@storesToProps\n' +
							'\n' +
							'// pass one store to defaultProps component\n' +
							'@storeToProps(ExampleStore.name)\n' +
							'\n' +
							'// make an observer component and pass one store to defaultProps component\n' +
							'@followStore(ExampleStore.name)\n' +
							''
						}
					</SyntaxHighlighter>
				</div>
			</div>
		);
	}
}