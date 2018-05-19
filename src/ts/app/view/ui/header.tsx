import * as React from 'react';
import { PropTypes } from 'prop-types';
import { contextToProps } from '../../../lib/decorators/context';
import { I18nextService } from '../../../lib/services/i18n-service';
import { AppStores } from '../../stores/app-stores';

export interface Props {
    mainPage: boolean;
    headMenu: any[];
    scrollTop: number;
    i18n?: I18nextService;
    stores?: AppStores;
}

@contextToProps
export class HeaderComponent extends React.Component<Props> {
    static defaultProps = {
        staticData: {}
    };

    render() {
        return (
            <header className="header">
                <div
                    className={
                        this.props.mainPage ? 'container main-page-header' : 'container main-page-header header-simple'
                    }>
                    <div className="main-head">
                        <h1>
                            <a href="#">ReactMVC</a>
                        </h1>
                        <div>
                            Isomorphic React Framework
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}