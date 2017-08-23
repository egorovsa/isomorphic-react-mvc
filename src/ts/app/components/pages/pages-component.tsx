import * as React from 'react';
import {Store, StoreComponent} from "react-stores";
import {PagesStore} from "../../stores/pages";

export interface Props {
	params?: any
}

export interface State {

}

export interface StoresState {
	pages: Store<PagesStore.State>
}

export class PagesComponent extends StoreComponent<Props, State, StoresState> {
	constructor() {
		super({
			pages: PagesStore.store
		});
	}

	public render() {
		return (
			<div className="container">
				<div className="page-content" dangerouslySetInnerHTML={{__html: this.stores.pages.state.currentPage.content}}></div>
			</div>
		);
	}
}