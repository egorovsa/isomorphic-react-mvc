import * as React from 'react';
import {Store, StoreComponent} from "react-stores";
import {LocaleStore} from "../stores/locale";
import {I18nService} from "../services/i18n-service";

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

	state: State = {};

	private createMarkup() {
		return {__html: I18nService.translate(this.props.id, this.props.data)};
	}

	public render() {
		return (
			<span dangerouslySetInnerHTML={this.createMarkup()} className={this.props.className}></span>
		);
	}
}