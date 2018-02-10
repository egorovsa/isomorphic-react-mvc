import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {vs2015} from 'react-syntax-highlighter/dist/styles/hljs';
import {Store} from "react-stores";
import {CommonStore} from "../../stores/common";
import {PagesStore} from "../../stores/pages";
import {Stores} from "../../../lib/stores/stores";
import {ExampleStore} from "../../stores/example";
import {followStore} from "../../../lib/decorators/context";
import {I18nextService} from "../../../lib/services/i18n-service";
import {InitialStateUtils} from "../../../lib/services/initial-state-utils";
import {AppStores} from "../../stores/app-stores";

export interface Props {
	params?: any
}

export interface State {

}

export class StoresUsage extends React.Component<Props, State> {
	public render() {
		return (
			<div className="container">
				<div className="page-content">
					<h1>Stores</h1>

					<span className="list-item">The framework uses <a
						href="https://www.npmjs.com/package/react-stores">React-stores</a>. Please use documentation of this module
					</span>

					<h3>New store's creating</h3>

					<span className="list-item light">
						First you need to create a model of your new store at:
					</span>

					<SyntaxHighlighter language='typescript' style={vs2015}>
						{
							'// src/ts/app/stores/example.ts \n' +
							'export namespace ExampleStore {\n' +
							'    export const name: string = \'example\';\n' +
							'\n' +
							'    export interface State {\n' +
							'        counter: number\n' +
							'    }\n' +
							'\n' +
							'    export const initialState: State = {\n' +
							'        counter: 0\n' +
							'    };\n' +
							'}'
						}
					</SyntaxHighlighter>

					<span className="list-item light">
						Second step: Create a new store with your model usage.
					</span>

					<SyntaxHighlighter language='typescript' style={vs2015}>
						{
							'// src/ts/app/stores/app-stores.ts \n' +
							'export class AppStores extends Stores {\n' +
							'    constructor() {\n' +
							'        super();\n' +
							'\n' +
							'        // ...\n' +
							'        // ...\n' +
							'\n' +
							'        // Create your new store with model usage\n' +
							'        this.example = new Store(ExampleStore.initialState);\n' +
							'    }\n' +
							'\n' +
							'    // ...\n' +
							'    // ...\n' +
							'\n' +
							'    // Append a new methods of your store\n' +
							'    public example: Store<ExampleStore.State>;\n' +
							'}'
						}
					</SyntaxHighlighter>

					<h3>Usage in controller</h3>

					<span className="list-item light">
						Controller class has its own method which contains AppStores class instance.
					</span>

					<SyntaxHighlighter language='typescript' style={vs2015}>
						{'Controller.stores: AppStores;'}
					</SyntaxHighlighter>

					<span className="list-item light">
						You are able to use all react-stores module methods in your controllers methods
					</span>

					<SyntaxHighlighter language='typescript' style={vs2015}>
						{
							'// some controller method\n' +
							'//...\n' +
							'//...\n' +
							'// read store value\n' +
							'let counter:number = this.stores.example.counter;\n' +
							'\n' +
							'// write new value\n' +
							'this.stores.example.setState({\n' +
							'    counter: 5\n' +
							'} as ExampleStore.State);'
						}
					</SyntaxHighlighter>

					<h3>Usage in view layer</h3>

					<span className="list-item light">
						View layer can follow for the store if you connect its to store. <br/>
						If some changes in connected store occured, connected component will be rerendered.<br/>
						Just use followStore decorator
					</span>

					<SyntaxHighlighter language='typescript' style={vs2015}>
						{
							'followStore(storeName: string)'
						}
					</SyntaxHighlighter>

					<span className="list-item light">How to use:</span>

					<SyntaxHighlighter language='javascript' style={vs2015}>
						{
							'import * as React from \'react\';\n' +
							'import {Store} from "react-stores";\n' +
							'import {ExampleStore} from "../../stores/example";\n' +
							'import {CommonStore} from "../../stores/common";\n' +
							'import {followStore} from "../../../lib/decorators/context";\n' +
							'\n' +
							'export interface Props {\n' +
							'    example?: Store<ExampleStore.State>\n' +
							'    common?: Store<CommonStore.State>\n' +
							'}\n' +
							'\n' +
							'export interface State {\n' +
							'}\n' +
							'\n' +
							'@followStore(ExampleStore.name)\n' +
							'@followStore(CommonStore.name)\n' +
							'export class ViewComponent extends React.Component<Props, State> {\n' +
							'    state: State = {};\n' +
							'\n' +
							'    render() {\n' +
							'        return (\n' +
							'            <div>\n' +
							'                <h2>The counter is:</h2>\n' +
							'                {this.props.example.state.counter}\n' +
							'\n' +
							'                <a\n' +
							'                    href="#"\n' +
							'                    onClick={() => {\n' +
							'                        this.props.example.setState({\n' +
							'                            counter: this.props.example.state.counter++\n' +
							'                        });\n' +
							'                    }}\n' +
							'                >\n' +
							'                    Increase counter\n' +
							'                </a>\n' +
							'            </div>\n' +
							'        );\n' +
							'    }\n' +
							'}'
						}
					</SyntaxHighlighter>

					<span className="list-item light">
						If you don't want to have  component as observer, but also need to have an access to some store, 
						use storeToProps() decorator
					</span>

					<SyntaxHighlighter language='javascript' style={vs2015}>
						storeToProps(storeName: string)
					</SyntaxHighlighter>

					<span className="list-item light"/>

					<SyntaxHighlighter language='javascript' style={vs2015}>
						{
							'//...\n' +
							'export interface Props {\n' +
							'    example?: Store<ExampleStore.State>\n' +
							'}\n' +
							'//...\n' +
							'\n' +
							'@storeToProps(ExampleStore.name)\n' +
							'export class ViewComponent extends React.Component<Props, State> {\n' +
							'\n' +
							'    render() {\n' +
							'        return (\n' +
							'            <div>\n' +
							'                <a\n' +
							'                    href="#"\n' +
							'                    onClick={() => {\n' +
							'                        this.props.example.setState({\n' +
							'                            counter: this.props.example.state.counter++\n' +
							'                        });\n' +
							'                    }}\n' +
							'                >\n' +
							'                    Increase counter somewhere\n' +
							'                </a>\n' +
							'            </div>\n' +
							'        );\n' +
							'    }\n' +
							'}'
						}
					</SyntaxHighlighter>

					<span className="list-item light"/>
					<SyntaxHighlighter language='javascript' style={vs2015}>
						{
							'//...\n' +
							'export interface Props {\n' +
							'    stores?: AppStores\n' +
							'}\n' +
							'\n' +
							'// Will provide all stores to defaultProps by stores:AppStores\n' +
							'@storesToProps\n' +
							'export class ViewComponent extends React... \n' +
							'// ...'
						}
					</SyntaxHighlighter>
				</div>
			</div>
		);
	}
}