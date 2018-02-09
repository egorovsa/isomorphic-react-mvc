import * as React from 'react';
import {PropTypes} from "prop-types";

export const setContext = (WrappedComponent: React.ComponentClass): any => {
	WrappedComponent.contextTypes = {
		i18n: PropTypes.object,
		initialStateInstance: PropTypes.object,
		stores: PropTypes.object
	};

	return WrappedComponent;
};

export const contextToProps = (WrappedComponent: React.ComponentClass): any => {
	class Component extends React.Component {
		static contextTypes = {
			i18n: PropTypes.object,
			initialStateInstance: PropTypes.object,
			stores: PropTypes.object
		};

		public render() {
			return <WrappedComponent {...this.props} {...this.context}/>;
		}
	}

	return Component;
};