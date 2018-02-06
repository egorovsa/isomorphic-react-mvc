import * as React from 'react';

export interface Props {
	isAuthenticated?: string
	test?: any
}

export interface State {

}

export class ActionComponentNotFound extends React.Component<Props, State> {
	render() {
		return (
			<div className="container page-not-found">
				<div className="page-404">
					Action component is not found
				</div>
				<div className="description">
					We are expected that you have file
				</div>

			</div>
		);
	}
}