import * as React from 'react';
import {Link} from "react-router";
import {NavComponent} from "./nav";
import {PricesSliderComponent} from "./prices-slider";
import {CommonStore} from "../../stores/common";

export interface Props {
	mainPage: boolean,
	headMenu: any[],
}

export interface State {

}

export class HeaderComponent extends React.Component<Props, State> {

	static defaultProps = {
		staticData: {
			company_name: ''
		}
	};

	render() {
		return (
			<header className="header">
				<div
					className={this.props.mainPage ? "container main-page-header" : "container main-page-header header-simple"}>
					<div className="main-head">
						<h1>React SVC (like MVC) isomorphic boilerplate v0.0.1</h1>
						<div className="description">
							Tech: React, React-stores, TypeScript, Stylus, Webpack, Express
						</div>
					</div>

					<div className="main-menu">
						<div className="mobile-menu">
							<a href="javascript:void(0);" onClick={() => {
								CommonStore.store.setState({
									sideNav: true
								} as CommonStore.State);
							}}>Side menu</a>
						</div>

						<NavComponent headMenu={this.props.headMenu}/>
					</div>
				</div>
			</header>
		);
	}
}