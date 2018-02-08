import * as React from 'react';
import {Store, StoreComponent} from "react-stores";
import {LocaleStore} from "../stores/locale";
import {PropTypes} from "prop-types";

export interface Props {
	id: string,
	data?: any,
	className?: string,
}

export interface State {
}

interface StoresState {
	locale: Store<LocaleStore.State>
}

export class UII18nText extends StoreComponent<Props, State, StoresState> {
	constructor() {
		super({
			locale: LocaleStore.store
		});
	}

	static contextTypes = {
		i18n: PropTypes.object
	};

	state: State = {};

	private createMarkup() {
		return {__html: this.context.i18n.translate(this.props.id, this.props.data)};
	}

	public render() {
		return (
			<span dangerouslySetInnerHTML={this.createMarkup()} className={this.props.className}></span>
		);
	}
}