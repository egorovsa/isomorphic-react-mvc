import * as React from 'react';
import {Link} from "react-router";

export interface Props {
	active: boolean,
	headMenu: any[],
	close: () => void
}

export interface State {

}

export class SideNavComponent extends React.Component<Props, State> {
	state: State = {
		children: []
	};

	render() {
		return (
			<div className={this.props.active ? "sidenav active" : "sidenav"}>
				<a href="javascript:void(0)" onClick={this.props.close} className="closebtn" key={123213}>&times;</a>
				123
			</div>
		);
	}
}