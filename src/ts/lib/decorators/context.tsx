import * as React from 'react';
import {PropTypes} from "prop-types";
import {Store} from "react-stores";
import {ContextProps} from "../view/context-wrapper";

export const setContext = (WrappedComponent: React.ComponentClass): any=> {
	WrappedComponent.contextTypes = {
		i18n: PropTypes.object,
		initialStateInstance: PropTypes.object,
		stores: PropTypes.object
	};

	return WrappedComponent;
};

export const contextToProps = (WrappedComponent: React.ComponentClass): any => {
	@setContext
	class Component extends React.Component {
		public render() {
			return <WrappedComponent {...this.props} {...this.context}/>;
		}
	}

	return Component;
};

export const followStore = (storeName: string) => (WrappedComponent: React.ComponentClass): any => {
	class Component extends React.Component {
		context: ContextProps;

		componentWillMount() {
			let store: Store<any> = null;

			if (this.context.stores.hasOwnProperty(storeName)) {
				store = this.context.stores[storeName];

				store.on('all', (storeState: any) => {
					console.log(storeState);
				})
			}
		}

		public render() {
			return <WrappedComponent {...this.props} {...this.context}/>;
		}
	}

	return Component;
};