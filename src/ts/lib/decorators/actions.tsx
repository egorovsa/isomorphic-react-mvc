import * as React from 'react';
import {PropTypes} from "prop-types";

export const actionsToProps = (WrappedComponent: React.ComponentClass): any => {
	class Component extends React.Component {
		static contextTypes = {
			appActions: PropTypes.object
		};

		public render() {
			return <WrappedComponent {...this.props} {...this.context}/>;
		}
	}

	return Component;
};