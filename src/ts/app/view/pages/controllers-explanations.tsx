import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {vs2015} from 'react-syntax-highlighter/dist/styles/hljs';
import {UII18nText} from "../../../lib/view/ui-i18n-component";
import {I18nextService} from "../../../lib/services/i18n-service";

export interface Props {
	i18n?: I18nextService,
}

export interface State {
}

export class ControllersExplanations extends React.Component<Props, State> {
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

						<SyntaxHighlighter language='typescript' style={vs2015}>
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

						<SyntaxHighlighter language='typescript' style={vs2015}>
							{
								'public async beforeFilter(data?: any): Promise<any> {\n' +
								'\tawait super.beforeFilter(data);\n' +
								'}'
							}
						</SyntaxHighlighter>

						<h1>The Controllers List</h1>

						<div className="list-item light danger">
							Each new controller has to be appended to <b>ControllersList</b> class. <br/>
							ReactMVC has to know about all controllers you have
						</div>

						<SyntaxHighlighter language='typescript' style={vs2015}>
							{
								'/src/ts/app/controllers/controllers-list.ts'
							}
						</SyntaxHighlighter>


						<div className="list-item light">
							For instance: You have created ShopController and you have to append it to controllers list.<br/>
							Using Controllers method <b>setController</b> append name and definition of your controller.
						</div>

						<SyntaxHighlighter language='typescript' style={vs2015}>
							{
								'import {ShopController} from "./shop-controller";\n' +
								'\n' +
								'export class ControllersList extends Controllers {\n' +
								'\tconstructor(data: RouterState, initialStateInstance: InitialStateUtils, i18n: I18nextService) {\n' +
								'\t\tsuper(data, initialStateInstance, i18n);\n' +
								'\n' +
								'\t\t this.setController(\'shop\', ShopController);\n' +
								'\t}\n' +
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

						<div className="list-item light">
							By convention, ReactMVC renders a view with an inflected version of the action name.
							For instance SomeController might contain the view(),
							share(), and searching() actions. The controller contains:
						</div>

						<SyntaxHighlighter language='typescript' style={vs2015}>
							{
								'import {AppController} from "./app-controller";\n' +
								'\n' +
								'export class SomeController extends AppController {\n' +
								'\tconstructor(data) {\n' +
								'\t\tsuper(data);\n' +
								'\t}\n' +
								'\n' +
								'\tpublic view(id) {\n' +
								'\t\t//action logic goes here..\n' +
								'\t}\n' +
								'\n' +
								'\tpublic share(customerId, recipeId) {\n' +
								'\t\t//action logic goes here..\n' +
								'\t}\n' +
								'\n' +
								'\tpublic searching(query) {\n' +
								'\t\t//action logic goes here..\n' +
								'\t}\n' +
								'}'
							}
						</SyntaxHighlighter>
						<div className="list-item light">
							The view files for these actions would be /ts/app/view/some/view.tsx,
							/ts/app/view/some/share.tsx, and /ts/app/view/some/searching.tsx. The conventional view file
							name
							is the lowercased and underscored version of the action name.
						</div>

						<div className="list-item light">
							Controller actions generally use set() to create a props that View component uses to render
							the
							view. Because of the conventions that ReactMVC uses, you don’t need to create and render the
							view manually. Instead, once a controller action has completed, ReactMVC will handle
							rendering and delivering the View.
						</div>

						<SyntaxHighlighter language='typescript' style={vs2015}>
							{
								'public searching($query) {\n' +
								'\t//action logic goes here..\n' +
								'\tthis.set({\n' +
								'\t\tfoo:"bar"\n' +
								'\t})\n' +
								'}\n'
							}
						</SyntaxHighlighter>

						<div className="list-item light">
							If for some reason you’d like to skip the default behavior, both of the following techniques
							will bypass the default view rendering behavior.
						</div>

						<SyntaxHighlighter language='typescript' style={vs2015}>
							{
								'import {MainPageComponent} from "../view/pages/main-page-component";\n' +
								'//...\n' +
								'//...\n' +
								'\tpublic async main() {\n' +
								'\t\tthis.component = MainPageComponent;\n' +
								'\n' +
								'\t\tthis.setMetaData({\n' +
								'\t\t\ttitle: "Page title here"\n' +
								'\t\t\tdescription: "Page description"\n' +
								'\t\t\tkeywords: "Page keywords"\n' +
								'\t\t})\n' +
								'\t}'
							}
						</SyntaxHighlighter>

						<div className="list-item light"></div>

						<h1>Controller Methods</h1>

						<div className="list-item light">
							To be continued...
						</div>
					</div>
				</div>
			</div>
		);
	}
}
