import {Controller} from "../../lib/controllers/controller";
import {CommonStore} from "../stores/common";

export class AppController extends Controller {
	constructor(data) {
		super(data);
	}

	public async beforeFilter(data?: any): Promise<any> {
		const pagesMenu = await this.apiRequest.pages.getPagesMenu();

		CommonStore.store.setState({
			mainPage: false,
			mainMenu: pagesMenu
		} as CommonStore.State);

		await super.beforeFilter(data);
	}
}