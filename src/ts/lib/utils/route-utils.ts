import {Router, Route, IndexRoute, browserHistory, RouterState} from 'react-router';
import {CONFIG} from "../config";
import {ControllersList} from "../../app/controllers/controllers-list";
import objectAssign = require("object-assign");

export class RouteUtils {

	static setSlashToPath(path: string): string {
		let exitPath: string = '';

		if (path.substr(path.length - 1, 1) === '/') {
			exitPath = path;
		} else {
			exitPath = path + '/';
		}

		if (exitPath.substr(0, 1) === '/') {
			exitPath = exitPath.substr(1, exitPath.length - 1);
		}

		return exitPath;
	}

	static removeLastSlash(path: string): string {
		if (path.substr(path.length - 1, 1) === '/') {
			return path.substr(0, path.length - 1);
		}

		return path;
	}

	static parseCustomRoutes(data: RouterState) {
		let controller: string = '';
		let action: string = '';
		let countRemove: number = 0;

		CONFIG.CUSTOM_ROUTES.map((route) => {
			let path = RouteUtils.setSlashToPath(route.path);
			let pathName = RouteUtils.setSlashToPath(data.location.pathname);

			if (route.path === data.location.pathname) {
				controller = route.controller;
				action = route.action;
				countRemove = RouteUtils.removeLastSlash(path).split('/').length
			} else if (route.path !== '/' && pathName.indexOf(path) === 0) {
				controller = route.controller;
				action = route.action;
				countRemove = RouteUtils.removeLastSlash(path).split('/').length
			}
		});

		return {
			controller: controller,
			action: action,
			countRemove: countRemove
		}
	}

	static parseParams(controllers: ControllersList, data: RouterState) {

		let controller = '';
		let action = CONFIG.DEFAULT_ACTION;
		let customRoutes = this.parseCustomRoutes(data);
		let params: Router.Params = objectAssign({}, data.params);

		if (customRoutes.controller) {
			controller = customRoutes.controller;
			action = customRoutes.action;

			for (let i = 0; i < customRoutes.countRemove; i++) {
				delete params['param' + i];
			}
		} else {
			if (controllers.isController(params['param0'])) {
				controller = params['param0'];

				if (controllers.isAction(params['param0'], params['param1'])) {
					action = params['param1'];

					delete params['param1'];
				}

				delete params['param0'];
			}
		}

		return {
			controller: controller,
			action: action,
			params: this.paramsToArray(params)
		}
	}

	static paramsToArray(params: Router.Params): string[] {
		let paramsArray: string[] = [];

		for (let key in params) {
			paramsArray.push(params[key])
		}

		return paramsArray;
	}

	static makeParamsPath(): string {
		let params: string = '';

		for (let i = 0; i < 20; i++) {
			if (i === 0) {
				params += `(:param${i})`;
			} else {
				params += `(/:param${i})`;
			}
		}

		return params;
	}

}