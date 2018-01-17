import {Controller} from "../../lib/controllers/controller";
import {CommonStore} from "../stores/common";
import {AppApi} from "../api/app-api";

export class AppController extends Controller {
	constructor(data) {
		super(data);
	}

	public async beforeFilter(data?: any): Promise<any> {
		const pagesMenu = await AppApi.pages.getPagesMenu();

		CommonStore.store.setState({
			mainPage: false,
			mainMenu: pagesMenu
		} as CommonStore.State);

		await super.beforeFilter(data);
	}
}