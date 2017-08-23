import * as React from 'react';

export interface Props {
	isAuthenticated?:string
	test?:any
}

export interface State {

}

export class PageNotFoundComponent extends React.Component<Props, State> {
	render() {
		return (
			<div>
				404
				{this.props.test}
				{this.props.isAuthenticated}
			</div>
		);
	}
}