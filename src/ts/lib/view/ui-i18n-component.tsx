import * as React from 'react';
import {PropTypes} from "prop-types";
import {contextToProps, setContext} from "../decorators/context";
import {ContextProps} from "./context-wrapper";
import {I18nextService} from "../services/i18n-service";
import {StoresList} from "../../app/stores/stores";
import {LocaleStore} from "../stores/locale";

export interface Props {
	id: string,
	data?: any,
	className?: string,
	i18n?: I18nextService,
	stores?: StoresList
}

export interface State {
	currentLang: string
}

@contextToProps
export class UII18nText extends React.Component<Props, State> {
	// context: ContextProps;

	private createMarkup() {
		return {__html: this.props.i18n.translate(this.props.id, this.props.data)};
	}

	componentWillMount() {
		const localStore = this.props.stores.locale;

		localStore.on('all', (storeState: LocaleStore.State) => {
			this.setState({
				currentLang: storeState.currentLang
			});
		});
	}

	public render() {
		return (
			<span
				dangerouslySetInnerHTML={this.createMarkup()}
				className={this.props.className}
			/>
		);
	}
}