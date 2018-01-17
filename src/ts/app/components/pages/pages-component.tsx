import * as React from 'react';
import {PagesStore} from "../../stores/pages";

export interface Props {
	page: PagesStore.Page
}

export interface State {

}

export class PagesComponent extends React.Component<Props, State> {
	public render() {
		return (
			<div className="container pages-container">
				<h1>{this.props.page.name}</h1>
				<div className="page-content" dangerouslySetInnerHTML={{__html: this.props.page.content}}></div>
			</div>
		);
	}
}