import * as React from 'react';

export interface Props {
	isAuthenticated?: string
	test?: any
}

export interface State {

}

export class PageNotFoundComponent extends React.Component<Props, State> {
	render() {
		return (
			<div className="main-content-section">
				<div className="container">
					<div className="page-content">
						<div className="page-404">
							404
						</div>
						<div className="description">
							Page not found
						</div>

					</div>
				</div>
			</div>
		);
	}
}