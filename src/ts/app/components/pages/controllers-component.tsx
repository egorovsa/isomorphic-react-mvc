import * as React from 'react';
import {Store, StoreComponent} from "react-stores";
import {CommonStore} from "../../stores/common";
import {PagesStore} from "../../stores/pages";

import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/dist/styles/hljs';
import {UII18nText} from "../../../lib/components/ui-i18n-component";
import {I18nextService} from "../../../lib/services/i18n-service";

export interface Props {
	i18n?: I18nextService,
}

export interface State {
}


export class ControllersComponent extends React.Component<Props, State> {
	public render() {
		return (
			<div>
				<div className="container">
					<div className="page-content">
						<h1>
							<UII18nText id={"Controllers"}/>
						</h1>


						<div className="list-item light">
							Controllers are the ‘C’ in MVC. After routing has been applied and the correct controller
							has been found, your controller’s action is called.
							Your controller should handle interpreting the request data, making sure the correct models
							are called, and the right response or view is rendered.
							Controllers can be thought of as middle man between the Model and View. You want to keep
							your controllers thin, and your models fat.
							This will help you more easily reuse your code and makes your code easier to test.
						</div>

						<div className="list-item light">
							Your application’s controllers extend the AppController class, which in turn extends the
							core Controller class.
							The AppController class can be defined in /ts/app/controllers/app-controller.ts and it
							should contain methods that are shared between all of your application’s controllers.
						</div>

						<div className="list-item light">
							Controllers provide a number of methods that handle requests. These are called actions. By
							default, each public method in a controller is an action, and is accessible from a URL.
							An action is responsible for interpreting the request and creating the response.
						</div>

						<h1>The App Controller</h1>

						<div className="list-item light">
							As stated in the introduction, the AppController class is the parent class to all of your
							application’s controllers.
							AppController itself extends the Controller class included in the ReactMVC core library.
							AppController is defined in /ts/app/controllers/app-controller.ts as follows:
						</div>

						<SyntaxHighlighter language='bash' style={docco}>
							{
								'import {Controller} from "../../lib/controllers/controller";\n' +
								'import {CommonStore} from "../stores/common";\n' +
								'\n' +
								'export class AppController extends Controller {\n' +
								'\tconstructor(data) {\n' +
								'\t\tsuper(data);\n' +
								'\t}\n' +
								'\n' +
								'\tpublic async beforeFilter(data?: any): Promise<any> {\n' +
								'\t\tawait super.beforeFilter(data);\n' +
								'\t}\n' +
								'}'
							}
						</SyntaxHighlighter>

						<div className="list-item light">
							Controller attributes and methods created in your AppController will be available to all of
							your application’s controllers.
						</div>

						<div className="list-item light">
							Also remember to call AppController’s callbacks within child controller callbacks for best
							results:
						</div>

						<SyntaxHighlighter language='bash' style={docco}>
							{
								'public async beforeFilter(data?: any): Promise<any> {\n' +
								'\tawait super.beforeFilter(data);\n' +
								'}'
							}
						</SyntaxHighlighter>

						<h1>Request parameters</h1>

						<div className="list-item light">
							When a request is made to a ReactMVC application, App’s Router class use
							Routes Configuration to find and create the correct controller.
							The request data is encapsulated in a request object. ReactMVC puts all of the important
							request information into the this->request property.
						</div>

						<h1>Controller actions</h1>

						<div className="list-item light">
							Controller actions are responsible for converting the request parameters into a response for
							the browser/user making the request. ReactMVC uses conventions to automate this process and
							remove some boilerplate code you would otherwise need to write.
						</div>

						<h1>To be continued...</h1>
					</div>
				</div>
			</div>
		);
	}
}
