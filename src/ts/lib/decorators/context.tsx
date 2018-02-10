import * as React from 'react';
import {PropTypes} from "prop-types";
import {Store, StoreEvent} from "react-stores";

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

export const storesToProps = (WrappedComponent: React.ComponentClass): any => {
	class Component extends React.Component {
		static contextTypes = {
			stores: PropTypes.object
		};

		public render() {
			return <WrappedComponent {...this.props} {...this.context}/>;
		}
	}

	return Component;
};

export const storeToProps = (storeName: string) => (WrappedComponent: React.ComponentClass): any => {
	class Component extends React.Component {
		static contextTypes = {
			stores: PropTypes.object
		};

		public render() {
			let newProp = {};

			if (this.context.stores.hasOwnProperty(storeName)) {
				newProp[storeName] = this.context.stores[storeName];

			} else {
				console.error('ReactMVC: Following store\'s name as: ' + storeName + ' is not found')
			}

			return <WrappedComponent {...this.props} {...newProp}/>;
		}
	}

	return Component;
};

export const followStore = (storeName: string) => (WrappedComponent: React.ComponentClass): any => {
	class Component extends React.Component {
		private store: Store<any>;
		private storeEvent: StoreEvent<any> = null;

		state = {
			storeState: null
		};

		static contextTypes = {
			stores: PropTypes.object
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
			let newProp = {};

			if (this.context.stores.hasOwnProperty(storeName)) {
				newProp[storeName] = this.context.stores[storeName];
			}

			return <WrappedComponent {...this.props} {...newProp} {...{storeState: this.state.storeState}}/>;
		}
	}

	return Component;
};