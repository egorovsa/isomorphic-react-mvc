import * as React from 'react';
import {UII18nText} from "./ui-i18n-component";

export interface Props {
	isAuthenticated?: string
	pageNotFoundMessage?: string
}

export interface State {

}

export class PageNotFoundComponent extends React.Component<Props, State> {
	private getMessage() {
		if (this.props.pageNotFoundMessage) {
			return (
				<div className="description">
					<UII18nText id={this.props.pageNotFoundMessage}/>
				</div>
			)
		} else {
			return (
				<>
					<div className="page-404">
						404
					</div>
					<div className="description">
						Page not found
					</div>
				</>
			)
		}
	}

	render() {
		return (
			<div className="container page-not-found">
				{this.getMessage()}
			</div>
		);
	}
}