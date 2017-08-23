import * as React from 'react';
import {Store, StoreComponent} from "react-stores";
import {CommonStore} from "../../stores/common";
import {PagesStore} from "../../stores/pages";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles';

export interface Props {

}

export interface State {
	selectedMetro: number
}

export interface StoresState {
	common: Store<CommonStore.State>,
	pages: Store<PagesStore.State>
}

export class MainPageComponent extends StoreComponent<Props, State, StoresState> {
	constructor() {
		super({
			common: CommonStore.store,
			pages: PagesStore.store
		});
	}

	public render() {
		let codeString = '' +
			'constructor() {\n'+
			'\tsuper({\n'+
			'		common: CommonStore.store,\n'+
			'		pages: PagesStore.store\n'+
			'	})\n'+
			'}';

		return (
			<div>
				<div className="container">
					<SyntaxHighlighter language='javascript' style={docco}>{
						codeString
					}</SyntaxHighlighter>

					<div className="page-content"
						 dangerouslySetInnerHTML={{__html: this.stores.pages.state.currentPage.content}}
					/>
				</div>
			</div>
		);
	}
}