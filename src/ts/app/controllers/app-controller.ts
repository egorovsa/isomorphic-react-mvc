import {Controller} from "../../lib/controllers/controller";
import {CommonStore} from "../stores/common";
import {RouterState} from "react-router";

export class AppController extends Controller {
	constructor(data: RouterState) {
		super(data);
	}

	public async beforeFilter(data?: any): Promise<any> {
		const pagesMenu = await this.apiRequest.pages.getPagesMenu();

		this.stores.common.setState({
			mainPage: false,
			mainMenu: pagesMenu
		} as CommonStore.State);

		await super.beforeFilter(data);
	}
}