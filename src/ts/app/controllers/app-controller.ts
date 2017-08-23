import {Controller} from "../../lib/controllers/controller";
import {AppApi} from "../api/app-api";
import {CommonStore} from "../stores/common";

export class AppController extends Controller {
	constructor(data) {
		super(data);
	}

	public commonFilter() {
		return super.commonFilter().then((dataFromController) => {
			let promises: Array<Promise<any>> = [
				AppApi.pages.getMainMenu()
			];

			return new Promise((next) => {
				Promise.all(promises).then((data) => {
					CommonStore.store.setState({
						mainMenu: data[0].pages
					} as CommonStore.State);

					next();
				});
			});
		})
	}
}