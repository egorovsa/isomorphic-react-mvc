import * as React from "react";
import {PropTypes} from 'prop-types';
import {I18nextService} from "../services/i18n-service";
import {InitialStateUtils} from "../services/initial-state-utils";
import {StoresList} from "../../app/stores/stores";

export interface ContextProps {
	i18n: I18nextService,
	initialStateInstance: InitialStateUtils
	stores: StoresList
}

export class ContextWrapper extends React.Component<ContextProps, any> {

	static childContextTypes = {
		i18n: PropTypes.object,
		initialStateInstance: PropTypes.object,
		stores: PropTypes.object
	};

	getChildContext() {
		return {
			i18n: this.props.i18n,
			initialStateInstance: this.props.initialStateInstance,
			stores: this.props.stores
		};
	}

	render() {
		return (<>{this.props.children}</>);
	}
}