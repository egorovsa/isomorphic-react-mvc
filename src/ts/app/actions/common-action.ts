import {Store} from "react-stores";
import {CommonStore} from "../stores/common";

export class CommonAction {
	constructor(readonly store: Store<CommonStore.State>) {

	}

	public someAction() {

	}
}