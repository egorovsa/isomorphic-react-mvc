import * as React from "react";
import * as path from "path";
import * as express from "express";
import * as serialize from "serialize-javascript";
import {renderToString, renderToNodeStream} from "react-dom/server";
import {match, RouterContext} from "react-router";
import {readdirSync} from "fs";
import {createElement} from "react";
import {AppRouter} from "../router";
import {InitialStateUtils} from "../services/initial-state-utils";
import {MetaData} from "../controllers/controller";
import {I18nextService} from "../services/i18n-service";
import {PropTypes} from "prop-types";
import {ContextWrapper} from "../view/context-wrapper";
import CONFIG from "../../config/config";
import {AppStores} from "../../app/stores/app-stores";
import {AppActions} from "../../app/actions/app-actions";
import {AppLoadingComponent} from "../view/app-loading-component";

const headHtml = require("../../../hbs/index/head-part.hbs");
const footerHtml = require("../../../hbs/index/footer-part.hbs");

export class RenderServerSide {

	static responseHeader = {
		"Content-Type": "text/html",
		"Connection": "close"
	};

	static userAgentHandler(req: express.Request, res: express.Response, next: express.NextFunction): express.Response | void {
		const userAgent = req.headers["user-agent"];

		if (userAgent) {
			for (const item in CONFIG.USER_AGENT_BLOCK) {
				let uaBlock = CONFIG.USER_AGENT_BLOCK[item];

				if (uaBlock.userAgent && userAgent.indexOf(uaBlock.userAgent) > -1) {
					if (uaBlock.block) {
						return this.get404(req, res);
					} else {
						return res.status(301).redirect(uaBlock.redirectTo);
					}
				}
			}
		}

		next();
	}

	static checkUrlWithDots(req: express.Request, res: express.Response, next: express.NextFunction) {
		if (req.path.indexOf('.') >= 0) {
			return this.get404(req, res);
		}

		next();
	}

	static render(req: express.Request, res: express.Response): express.Response | void {
		const cookies = req.cookies;
		const initialStateInstance = new InitialStateUtils();
		const stores: AppStores = new AppStores();
		const i18n = new I18nextService(stores.locale, initialStateInstance);
		const router: AppRouter = new AppRouter(initialStateInstance, i18n, stores);
		const routes = router.mainRoute(true);

		i18n.setServerLanguage(req.acceptsLanguages(), cookies.language);

		match({routes, location: req.url}, (error, nextLocation, nextState) => {
			if (!error && nextState && nextState['params']) {
				if (nextState.params['param0'] && this.isControllerWebroot(nextState.params['param0'])) {
					return res.status(500).send();
				}

				if (nextLocation) {
					return res.status(301).send(nextLocation.pathname + nextLocation.search);
				}

				if (nextState) {
					if (!nextState.params['responseStatus']) {
						console.log('ERROR STATUS: ', req.url);
						nextState.params['responseStatus'] = 404;
					}

					res.writeHead(nextState.params['responseStatus'], {
						'Content-Type': 'text/html',
						'Connection': 'close'
					});

					this.getServerHtml(req, res, nextState, initialStateInstance, i18n, stores);
				} else {
					return this.get404(req, res);
				}
			} else {
				return this.get404(req, res);
			}
		});
	}

	static getServerHtml(req: express.Request, res: express.Response, nextState: any, initialStateInstance: InitialStateUtils, i18n: I18nextService, stores: AppStores): void {
		const metaData: MetaData = JSON.parse(nextState.params['metaData']);

		const stream = renderToNodeStream(
			<ContextWrapper
				i18n={i18n}
				initialStateInstance={initialStateInstance}
				stores={stores}
				appActions={new AppActions(stores)}
				server={true}
			>
				{createElement(CONFIG.DEFAULT_LOADING_COMPONENT, {})}
				{createElement(RouterContext, nextState)}
			</ContextWrapper>
		);

		initialStateInstance.setData('serverUserAgent', req.headers['user-agent']);

		res.write(headHtml({
			title: metaData.title,
			description: metaData.description,
			keywords: metaData.keywords,
			styleLink: '<link rel="stylesheet" href="/css/style.css?v=' + CONFIG.APP_VERSION + '">',
		}));

		stream.pipe(res, {end: false});

		stream.on("end", () => {
			if (process.env.DEVELOP) {
				initialStateInstance.setData('serverDev', true);
			}

			res.write(footerHtml({
				initialState: "<script>window[\"_INITIAL_STATE_\"] = " + serialize(initialStateInstance.initialState, {isJSON: true}) + "</script>",
				appVersion: CONFIG.APP_VERSION,
				vendorVersion: CONFIG.VENDOR_VERSION,
				server: true
			}));

			initialStateInstance.cleanInitialState();
			initialStateInstance = null;

			return res.end();
		});
	}

	static isControllerWebroot(controller: string) {
		let dir = readdirSync(path.resolve(__dirname, './../webroot'));
		return dir.indexOf(controller) >= 0;
	}

	static get404(req: express.Request, res: express.Response): express.Response | void {
		res.writeHead(404, this.responseHeader);
		return res.end('Page not found');
	}
}