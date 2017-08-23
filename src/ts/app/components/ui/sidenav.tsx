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
	
	render() {
		return (
			<div className={this.props.active ? "sidenav active" : "sidenav"}>
				<a href="javascript:void(0)" onClick={this.props.close} className="closebtn">&times;</a>

				{this.props.headMenu.map((item, i) => {
					let link = item.slug === '/' ? '/' : "/pages/" + item.slug;

					return (
						<Link key={i} to={link} onClick={this.props.close}>{item.name}</Link>
					)
				})}
			</div>
		);
	}
}