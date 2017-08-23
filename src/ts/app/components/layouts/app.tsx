import * as React from 'react';
import {HeaderComponent} from "../ui/header";
import {FooterComponent} from "../ui/footer";
import {SideNavComponent} from "../ui/sidenav";
import {CommonStore} from "../../stores/common";
import {Store, StoreComponent} from "react-stores";
import {PagesStore} from "../../stores/pages";

export interface Props {

}

export interface State {

}

export interface StoresState {
	common: Store<CommonStore.State>,
	pages: Store<PagesStore.State>
}


export class AppComponent extends StoreComponent<Props, State, StoresState> {
	constructor() {
		super({
			common: CommonStore.store,
			pages: PagesStore.store
		});
	}

	render() {
		return (
			<div>
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
					mainPage={this.stores.common.state.mainPage}
					headMenu={this.stores.common.state.mainMenu}
				/>

				{this.props.children}

			</div>
		);
	}
}