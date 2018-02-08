import * as React from "react";
import {PropTypes} from 'prop-types';
import {I18nextService} from "../services/i18n-service";
import {InitialStateUtils} from "../services/initial-state-utils";

export interface Props {
	i18n: I18nextService,
	initialStateInstance: InitialStateUtils
}

export class ContextWrapper extends React.Component<Props, any> {

	static childContextTypes = {
		i18n: PropTypes.object,
		initialStateInstance: PropTypes.object
	};

	getChildContext() {
		return {
			i18n: this.props.i18n,
			initialStateInstance: this.props.initialStateInstance
		};
	}

	render() {
		return (<>{this.props.children}</>);
	}
}