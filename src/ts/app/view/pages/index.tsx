import * as React from 'react';
import { PagesStore } from '../../stores/pages';

export interface Props {
    page: PagesStore.Page;
}

export interface State {

}

export class Index extends React.Component<Props, State> {
    public render() {
        return (
            <div className="page-content" dangerouslySetInnerHTML={{__html: this.props.page.content}}/>
        );
    }
}