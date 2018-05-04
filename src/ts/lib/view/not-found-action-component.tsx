import * as React from 'react';

export interface Props {
	nameOfComponent: string,
	controllerName: string,
	actionName: string,
	viewPath: string
}

export interface State {

}

export class ActionComponentNotFound extends React.Component<Props, State> {
	render() {
		return (
			<div className="main-content-section">
				<div className="container">
					<div className="page-content">
						<div className="page-404">
							<h1 className="danger">{this.props.actionName} view is not found</h1>

							Action component is not found
						</div>

						<div className="list-item light danger">
							We are expected that you have a file:
						</div>

						<div>
							{
								this.props.viewPath
							}
						</div>

						<div className="list-item light danger">
							which contains view React component with name : <b>{this.props.nameOfComponent}</b>
						</div>

						<div>
							{
								'import * as React from \'react\';\n' +
								'\n' +
								'export interface Props {\n' +
								'}\n' +
								'\n' +
								'export interface State {\n' +
								'}\n' +
								'\n' +
								'export class ' + this.props.nameOfComponent + ' extends React.Component<Props, State> {\n' +
								'\tpublic render() {\n' +
								'\t\treturn (\n' +
								'\t\t\t<div>Component html</div>\n' +
								'\t\t);\n' +
								'\t}\n' +
								'}'
							}
						</div>
					</div>
				</div>

			</div>
		);
	}
}