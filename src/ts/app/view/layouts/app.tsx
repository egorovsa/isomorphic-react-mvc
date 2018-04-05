import * as React from 'react';
import {HeaderComponent} from "../ui/header";
import {CommonStore} from "../../stores/common";
import {Store} from "react-stores";
import {PagesStore} from "../../stores/pages";
import {FooterComponent} from "../ui/common/footer";
import {UIScrollToTop} from "../ui/scroll-to-top";
import {SideNavComponent} from "../ui/common/sidenav";
import {PropTypes} from 'prop-types';
import {I18nextService} from "../../../lib/services/i18n-service";
import {followStore} from "../../../lib/decorators/context";

const NotificationContainer = require('react-notifications').NotificationContainer;

export interface Props {
	server: boolean,
	i18n: I18nextService,
	test: string,
	fetch: any,
	common?: Store<CommonStore.State>
	pages?: Store<PagesStore.State>
}

export interface State {
	scrollTop: number,
}

@followStore(CommonStore.name)
@followStore(PagesStore.name)
export class AppComponent extends React.Component<Props, State> {
	state: State = {
		scrollTop: 0
	};

	private updateDimensions = (e) => {
		this.props.common.setState({
			windowSize: e.target.innerWidth
		} as CommonStore.State);
	};

	private updateScrollTop = (e) => {
		this.setState({
			scrollTop: window.scrollY
		});
	};

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
		window.addEventListener("scroll", this.updateScrollTop);
	}

	componentWillUnmount() {
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
					active={this.props.common.state.sideNav}
					headMenu={this.props.common.state.mainMenu}
					close={() => {
						this.props.common.setState({
							sideNav: false
						} as CommonStore.State);
					}}
				/>

				<HeaderComponent
					mainPage={this.props.common.state.mainPage}
					headMenu={this.props.common.state.mainMenu}
					scrollTop={this.state.scrollTop}
				/>

				<section className="main-content-section">
					{this.props.children}
				</section>

				<FooterComponent
					mainPage={false}
					mainMenu={this.props.pages.state.mainMenu}
				/>

				<UIScrollToTop currentScroll={this.state.scrollTop}/>
			</div>
		);
	}
}