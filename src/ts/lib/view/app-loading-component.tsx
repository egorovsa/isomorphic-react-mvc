import * as React from 'react';
import {AppStore} from "../stores/app";
import {Store} from "react-stores";
import {followStore} from "../decorators/context";

export interface Props {
	app?: Store<AppStore.State>
}

export interface State {

}

@followStore(AppStore.name)
export class AppLoadingComponent extends React.Component<Props, State> {
	render() {
		return (
			<div className={this.props.app.state.appLoading ? "app-loading active" : "app-loading "}>
				<div className="app-loading-inner">
					<img src={require('./../../../img/gears.svg')}/>
				</div>
			</div>
		);
	}
}