import * as React from 'react';
import {CommonStore} from "../../stores/common";
import {NavComponent} from "./nav";
import {PropTypes} from 'prop-types';
import {contextToProps} from "../../../lib/decorators/context";
import {I18nextService} from "../../../lib/services/i18n-service";
import {AppStores} from "../../stores/app-stores";

export interface Props {
	mainPage: boolean,
	headMenu: any[],
	scrollTop: number,
	i18n?: I18nextService,
	stores?: AppStores
}

export interface State {

}

@contextToProps
export class HeaderComponent extends React.Component<Props, State> {
	static defaultProps = {
		staticData: {}
	};

	render() {
		return (
			<header className={"header"}>
				<div
					className={this.props.mainPage ? "container main-page-header" : "container main-page-header header-simple"}>
					<div className="main-head">
						<h1>
							<a href="#">Isomorphic React MVC Framework</a>
						</h1>
						<div className="description">
							Tech: React, React-stores, TypeScript, Stylus, Webpack, Express
						</div>
					</div>

					<div className="main-menu">
						<div className="mobile-menu">
							<a
								href="javascript:void(0);"
								onClick={() => {
									this.props.stores.common.setState({
										sideNav: true
									} as CommonStore.State);
								}}
							>
								Side menu
							</a>
						</div>

						<NavComponent headMenu={this.props.headMenu}/>

						<div className="grow"/>

						<span className="desktop-menu lang-selection">
							<a
								href="javascript:void(0);"
								onClick={() => {
									this.props.i18n.changeLanguage('en', true);
								}}
							>
								En
							</a>

							<a
								href="javascript:void(0);"
								onClick={() => {
									this.props.i18n.changeLanguage('ru', true);
								}}
							>
								Ru
							</a>
						</span>
					</div>
				</div>
			</header>
		);
	}
}