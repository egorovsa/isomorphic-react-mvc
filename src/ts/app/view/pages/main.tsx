import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {vs2015} from 'react-syntax-highlighter/dist/styles/hljs';
import {UII18nText} from "../../../lib/view/ui-i18n-component";
import {I18nextService} from "../../../lib/services/i18n-service";
import {Link} from "react-router";
import {StoreEventType} from "react-stores";

export interface Props {
	i18n?: I18nextService,
	test: string
}

export interface State {
}

export class Main extends React.Component<Props, State> {
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

						<div className="list-item light">
							This is a simple React isomorphic framework to make a simple websites with React
							technologies.
							<br/>
							<br/>
							It uses a standart Model View Controller pattern, but here is using a FLUX method for model.
						</div>

						<h1>How to install and start</h1>

						<h3>With Yarn</h3>
						<SyntaxHighlighter language='typescript' style={vs2015}>
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
						<SyntaxHighlighter language='typescript' style={vs2015}>
							{
								'//Install packages\n' +
								'$ npm i\n' +
								'\n' +
								'//Start to run development\n' +
								'$ npm run dev\n'
							}
						</SyntaxHighlighter>

						<div className="list-item light">
							After that just open http://localhost:3000 in your favorite browser
						</div>

						<h1>How to build</h1>

						<h3>With Yarn</h3>
						<SyntaxHighlighter language='typescript' style={vs2015}>
							{
								'$ yarn build\n'
							}
						</SyntaxHighlighter>
						<br/><br/>

						<h3>With npm</h3>
						<SyntaxHighlighter language='typescript' style={vs2015}>
							{
								'$ npm run build\n'
							}
						</SyntaxHighlighter>

						<div className="list-item light">
							Than you may run:
						</div>

						<SyntaxHighlighter language='typescript' style={vs2015}>
							{
								'$ node dist/server/server.js\n' +
								'\n' +
								'//or if you have pm2\n' +
								'\n' +
								'$ pm2 start pm2.json\n'
							}
						</SyntaxHighlighter>

						<div className="list-item light">
							and open your browser http://localhost:4002 where
							4002 is default server port, you might change in in config file
						</div>

						<h1>How it works</h1>

						<div className="list-item light">
							When a request is made to a ReactMVC application, for instance : <span
							className="inner-highlight">http://yourSite.com/pages/simple/param1/param2</span>, App’s
							Router class use Routes
							Configuration to find and create the correct controller. The request data is encapsulated in
							a request object. ReactMVC puts all of the important request information into the
							this->request property.
						</div>

						<SyntaxHighlighter language='javascript' style={vs2015}>
							{"/ts/app/controllers/pages-controller.ts"}
						</SyntaxHighlighter>

						<SyntaxHighlighter language='javascript' style={vs2015}>
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
								'\t\t\tfoo: "bar"\n' +
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

						<div className="list-item light">
							Take a look the
							<Link to={"/pages/controllersExplanations"}> controller explanation.</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}