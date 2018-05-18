import { RouterState } from 'react-router';
import CONFIG from '../../config/config';
import { ControllersList } from '../../app/controllers/controllers-list';
import { Params } from 'react-router/lib/Router';

export interface ParsedParams {
    controllerName: string;
    actionName: string;
    params: string[];
}

export interface ParsedCustomParams {
    controllerName: string;
    actionName: string;
    countRemove: number;
}

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

    static parseCustomRoutes(data: RouterState): ParsedCustomParams {
        let controllerName: string = '';
        let actionName: string = '';
        let countRemove: number = 0;

        CONFIG.CUSTOM_ROUTES.map((route) => {
            let path = RouteUtils.setSlashToPath(route.path);
            let pathName = RouteUtils.setSlashToPath(data.location.pathname);

            if (route.path === data.location.pathname) {
                controllerName = route.controller;
                actionName = route.action;
                countRemove = RouteUtils.removeLastSlash(path).split('/').length;
            } else if (route.path !== '/' && pathName.indexOf(path) === 0) {
                controllerName = route.controller;
                actionName = route.action;
                countRemove = RouteUtils.removeLastSlash(path).split('/').length;
            }
        });

        return {
            controllerName: controllerName,
            actionName: actionName,
            countRemove: countRemove
        };
    }

    static parseParams(controllers: ControllersList, data: RouterState): ParsedParams {
        let controllerName: string = CONFIG.DEFAULT_CONTROLLER;
        let actionName: string = CONFIG.DEFAULT_ACTION;
        let customRoutes: ParsedCustomParams = this.parseCustomRoutes(data);
        let params: Params = {...{}, ...data.params};

        if (customRoutes.controllerName) {
            controllerName = customRoutes.controllerName;
            actionName = customRoutes.actionName;

            for (let i = 0; i < customRoutes.countRemove; i++) {
                delete params['param' + i];
            }
        } else {
            if (controllers.isController(params.param0)) {
                controllerName = params.param0;

                if (controllers.isAction(params.param0, params.param1)) {
                    actionName = params.param1;
                    delete params.param1;
                } else if (!controllers.isAction(params.param0, actionName)) {
                    controllerName = CONFIG.DEFAULT_CONTROLLER;
                    actionName = CONFIG.DEFAULT_ACTION;
                }

                delete params.param0;
            }
        }

        return {
            controllerName: controllerName,
            actionName: actionName,
            params: this.paramsToArray(params)
        };
    }

    static paramsToArray(params: Params): string[] {
        let paramsArray: string[] = [];

        for (let key in params) {
            if (key && params[key]) {
                let newKey = key.match(/(\d+)/ig)[0];
                params[newKey] = params[key];
                delete params[key];
            }
        }

        for (let key in params) {
            if (params[key]) {
                paramsArray.push(params[key]);
            }
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