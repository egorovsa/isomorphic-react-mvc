import * as React from 'react';
import {PropTypes} from "prop-types";
import {Store, StoreEvent} from "react-stores";
import {ContextProps} from "../view/context-wrapper";

export const setContext = (WrappedComponent: React.ComponentClass): any => {
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
	@setContext
	class Component extends React.Component {
		context: ContextProps;
		private store: Store<any>;
		private storeEvent: StoreEvent<any> = null;

		state = {
			storeState: null
		};

		componentWillMount() {
			if (this.context.stores.hasOwnProperty(storeName)) {
				this.store = this.context.stores[storeName];

				this.storeEvent = this.store.on('all', (storeState: any) => {
					this.setState({
						test: storeState
					});
				})
			} else {
				console.error('ReactMVC: Following store\'s name as: ' + storeName + ' is not found')
			}
		}

		componentWillUnmount() {
			this.storeEvent.remove();
		}

		public render() {
			return <WrappedComponent {...this.props} {...this.context} {...{storeState: this.state.storeState}}/>;
		}
	}

	return Component;
};