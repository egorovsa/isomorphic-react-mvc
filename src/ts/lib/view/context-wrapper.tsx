import * as React from 'react';
import { PropTypes } from 'prop-types';
import { I18nextService } from '../services/i18n-service';
import { InitialStateUtils } from '../services/initial-state-utils';
import { AppStores } from '../../app/stores/app-stores';
import { AppActions } from '../../app/actions/app-actions';

export interface ContextProps {
    i18n: I18nextService;
    initialStateInstance: InitialStateUtils;
    stores: AppStores;
    appActions: AppActions;
    server: boolean;
}

export class ContextWrapper extends React.Component<ContextProps, any> {
    static childContextTypes = {
        i18n: PropTypes.object,
        initialStateInstance: PropTypes.object,
        stores: PropTypes.object,
        appActions: PropTypes.object,
        server: PropTypes.bool
    };

    public getChildContext() {
        return {
            i18n: this.props.i18n,
            initialStateInstance: this.props.initialStateInstance,
            stores: this.props.stores,
            appActions: this.props.appActions,
            server: this.props.server
        };
    }

    public render() {
        return (<>{this.props.children}</>);
    }
}