import * as React from 'react';
import {Link} from "react-router";

export interface Props {
	headMenu: any[]
}

export interface State {

}

export class NavComponent extends React.Component<Props, State> {
	static defaultProps = {
		headMenu: []
	};

	render() {
		return (
			<span className="desktop-menu">
				{this.props.headMenu.map((item, i) => {
					let link = item.slug === '/' ? '/' : "/pages/" + item.slug;

					return (
						<Link key={i} to={link}>{item.name}</Link>
					)
				})}
            </span>
		);
	}
}