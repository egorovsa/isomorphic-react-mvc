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
								'    constructor(data) {\n' +
								'        super(data);\n' +
								'    }\n' +
								'\n' +
								'    public async beforeFilter(data?: any): Promise<any> {\n' +
								'        await super.beforeFilter(data);\n' +
								'    }\n' +
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
								'    await super.beforeFilter(data);\n' +
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
								'    constructor(data: RouterState, initialStateInstance: InitialStateUtils, i18n: I18nextService) {\n' +
								'        super(data, initialStateInstance, i18n);\n' +
								'\n' +
								'        this.setController(\'shop\', ShopController);\n' +
								'    }\n' +
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
								'    constructor(data) {\n' +
								'        super(data);\n' +
								'    }\n' +
								'\n' +
								'    public view(id) {\n' +
								'        //action logic goes here..\n' +
								'    }\n' +
								'\n' +
								'    public share(customerId, recipeId) {\n' +
								'        //action logic goes here..\n' +
								'    }\n' +
								'\n' +
								'    public searching(query) {\n' +
								'        //action logic goes here..\n' +
								'    }\n' +
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
								'    //action logic goes here..\n' +
								'    this.set({\n' +
								'        foo:"bar"\n' +
								'    })\n' +
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
								'    public async main() {\n' +
								'        this.component = MainPageComponent;\n' +
								'\n' +
								'        this.setMetaData({\n' +
								'            title: "Page title here"\n' +
								'            description: "Page description"\n' +
								'            keywords: "Page keywords"\n' +
								'        })\n' +
								'    }'
							}
						</SyntaxHighlighter>

						<div className="list-item light"></div>

						<h1>Controller Methods</h1>

						<h3>Controller.set()</h3>
						<SyntaxHighlighter language='typescript' style={vs2015}>
							{
								'set(data: { [id: string]: any }): void'
							}
						</SyntaxHighlighter>

						<div className="list-item light">
							The set() method is the main way to send data from your controller to your view. Once you’ve
							used set(), the variable can be accessed in your view:
						</div>

						<SyntaxHighlighter language='typescript' style={vs2015}>
							{
								'// First you pass data from the controller:\n' +
								'this.set({\n' +
								'    foo: "bar"\n' +
								'})'
							}
						</SyntaxHighlighter>

						<SyntaxHighlighter language='' style={vs2015}>
							{
								'// Then, in the view, you can utilize the data as React prop\n\n' +
								'<div>{this.props.foo}</div>'
							}
						</SyntaxHighlighter>

						<div className="list-item light"></div>
						<h3>Controller.setMetaData()</h3>
						<SyntaxHighlighter language='typescript' style={vs2015}>
							{
								'// MetaData interface\n' +
								'export interface MetaData {\n' +
								'    title: string,\n' +
								'    keywords?: string,\n' +
								'    description?: string\n' +
								'}\n\n' +
								'\n' +
								'setMetaData(metaData: MetaData): void'
							}
						</SyntaxHighlighter>

						<div className="list-item light">
							The setMetaData() method is the same as set() the main way to send meta data like a title,
							description and keywords from your controller to your view.
						</div>

						<SyntaxHighlighter language='typescript' style={vs2015}>
							{
								'this.setMetaData({\n' +
								'    title: page.seo_title,\n' +
								'    description: page.seo_description,\n' +
								'    keywords: page.seo_keywords\n' +
								'});'
							}
						</SyntaxHighlighter>

						<div className="list-item light"></div>
						<h3>Controller.render()</h3>

						<SyntaxHighlighter language='typescript' style={vs2015}>
							{
								'render(component?: React.ComponentClass<any>): void'
							}
						</SyntaxHighlighter>

						<div className="list-item light">
							The render() method is automatically called at the end of each requested controller action.
							This method performs all the view logic (using the data you’ve submitted using the set()
							method), places the view inside its this.layout, and serves it back to the end user.
						</div>

						<SyntaxHighlighter language='typescript' style={vs2015}>
							{
								'import {MainPageComponent} from "../view/pages/main-page-component";\n\n' +
								'' +
								'//...\n' +
								'//PagesController\n' +
								'    public async main() {\n' +
								'        this.render(MainPageComponent);\n' +
								'    }'
							}
						</SyntaxHighlighter>

						<div className="list-item light">
							The default view file used by render is determined by convention. If the main() action of
							the PagesController is requested, the view file in /ts/app/view/pages/main.tsx will be
							rendered.
						</div>

						<div className="list-item light"></div>
						<h3>Controller.pageNotFound()</h3>

						<SyntaxHighlighter language='typescript' style={vs2015}>
							pageNotFound(status: number = 404): void
						</SyntaxHighlighter>

						<div className="list-item light">
							Use the method when you need to send page not found
						</div>

						<h1>Controller Utils</h1>

						<SyntaxHighlighter language='typescript' style={vs2015}>
							{
								'// API request service\n' +
								'// Look at the /ts/src/api/pages-api.ts example\n' +
								'public apiRequest: ApiEndpoints;\n\n' +
								'//Translations service\n' +
								'//the main function is i18n.translate()\n' +
								'public i18n: I18nextService;\n' +
								'// use in your controller\n' +
								'this.i18.translate("TRANSLATIONS_KEY", {foo:"bar"})\n\n' +
								'//stores instance in your controllers\n' +
								'public stores: AppStores;\n'
							}
						</SyntaxHighlighter>

						<div className="list-item light">
							The utils describing is under construction...
						</div>

						<h1>Controller Properties</h1>

						<SyntaxHighlighter language='typescript' style={vs2015}>
							{
								'public request: ControllerRequest;\n' +
								'public location: Location;\n' +
								'public query: { [key: string]: string };\n' +
								'public hash: string;\n' +
								'public search: string;\n' +
								'public pathname: string;\n' +
								'public responseStatus: number;\n' +
								'public notFound: boolean;\n' +
								'public layout: React.ComponentClass<any>;\n' +
								'public component: React.ComponentClass<any> | any;\n' +
								'public componentData: { [id: string]: any };\n' +
								'public metaData: MetaData;\n' +
								'public server: boolean;'
							}
						</SyntaxHighlighter>

						<h3>ControllerRequest properties</h3>

						<SyntaxHighlighter language='typescript' style={vs2015}>
							{
								'export interface ControllerRequest {\n' +
								'    location: Location\n' +
								'    query: { [key: string]: string }\n' +
								'    hash: string\n' +
								'    search: string\n' +
								'    pathname: string\n' +
								'}\n' +
								'\n' +
								'//use inside the methods of your controllers\n' +
								'console.log(this.request.query)'
							}
						</SyntaxHighlighter>
					</div>
				</div>
			</div>
		);
	}
}
