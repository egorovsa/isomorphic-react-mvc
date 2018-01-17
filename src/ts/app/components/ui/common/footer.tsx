import * as React from 'react';
import {Link} from "react-router";
import {PagesStore} from "../../../stores/pages";
import PagesMenu = PagesStore.PagesMenu;

export interface Props {
	mainPage?: boolean,
	mainMenu: PagesMenu[],
	staticData?: any,
}

export interface State {

}

export class FooterComponent extends React.Component<Props, State> {
	render() {
		return (
			<div>
				<footer className="main-footer">
					<div className="container">
						Isomorphic React MVC framework <br/>
						2017-2018
					</div>
				</footer>
			</div>
		);
	}
}