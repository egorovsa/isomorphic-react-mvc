import * as React from 'react';
import {HeaderComponent} from "../ui/header";
import {CommonStore} from "../../stores/common";
import {Store, StoreComponent} from "react-stores";
import {PagesStore} from "../../stores/pages";
import {FooterComponent} from "../ui/common/footer";
import {UIScrollToTop} from "../ui/scroll-to-top";
import {SideNavComponent} from "../ui/common/sidenav";
import {PropTypes} from 'prop-types';
import {I18nextService} from "../../../lib/services/i18n-service";

const NotificationContainer = require('react-notifications').NotificationContainer;

export interface Props {
	server: boolean,
	i18n: I18nextService,
	test: string,
	fetch:any
}

export interface State {
	scrollTop: number
}

export interface StoresState {
	common: Store<CommonStore.State>
	pages: Store<PagesStore.State>
}

export class AppComponent extends StoreComponent<Props, State, StoresState> {
	constructor() {
		super({
			common: CommonStore.store,
			pages: PagesStore.store
		});
	}

	componentWillMount() {

	}

	state: State = {
		scrollTop: 0
	};

	private updateDimensions = (e) => {
		this.stores.common.setState({
			windowSize: e.target.innerWidth
		} as CommonStore.State);
	};

	private updateScrollTop = (e) => {
		this.setState({
			scrollTop: window.scrollY
		});
	};

	storeComponentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
		window.addEventListener("scroll", this.updateScrollTop);
	}

	storeComponentWillUnmount() {
		if (!this.props.server) {
			window.removeEventListener("resize", this.updateDimensions);
			window.removeEventListener("scroll", this.updateScrollTop);
		}
	}

	render() {
		return (
			<div>
				{!this.props.server && <NotificationContainer/>}

				<SideNavComponent
					active={this.stores.common.state.sideNav}
					headMenu={this.stores.common.state.mainMenu}
					close={() => {
						this.stores.common.setState({
							sideNav: false
						} as CommonStore.State);
					}}
				/>

				<HeaderComponent
					i18n={this.props.i18n}
					mainPage={this.stores.common.state.mainPage}
					headMenu={this.stores.common.state.mainMenu}
					scrollTop={this.state.scrollTop}
				/>

				<section className="main-content-section">
					{this.props.children}
				</section>

				<FooterComponent
					mainPage={false}
					mainMenu={this.stores.pages.state.mainMenu}
				/>

				<UIScrollToTop currentScroll={this.state.scrollTop}/>
			</div>
		);
	}
}