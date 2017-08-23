import * as React from 'react';

export interface Props {
	mainPage: boolean,
	staticData: any,
}

export interface State {

}

export class FooterComponent extends React.Component<Props, State> {
	render() {
		return (
			<footer>
				<div className="container main-page-header">
					<div className="main-head">
						<div className="logo">
							Logo here
						</div>

						<div className="name"> Company name</div>

						<div className="title">
							<div>
								Description
							</div>
						</div>

						<div className="phones">Phones</div>
					</div>
				</div>
			</footer>
		);
	}
}