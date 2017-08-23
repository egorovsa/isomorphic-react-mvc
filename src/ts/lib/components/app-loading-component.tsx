import * as React from 'react';

export interface Props {
	active: boolean
}

export interface State {

}

export class AppLoadingComponent extends React.Component<Props, State> {
	render() {
		return (
			<div className={this.props.active ? "app-loading active" : "app-loading "}>
				<div className="app-loading-inner">
					<img src="./../img/gears.svg" />
				</div>
			</div>
		);
	}
}