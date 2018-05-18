import * as React from 'react';
import { PropTypes } from 'prop-types';
import { contextToProps, followStore } from '../decorators/context';
import { I18nextService } from '../services/i18n-service';
import { AppStores } from '../../app/stores/app-stores';
import { LocaleStore } from '../stores/locale';
import { PagesStore } from '../../app/stores/pages';

export interface Props {
    id: string;
    data?: any;
    className?: string;
    i18n?: I18nextService;
    stores?: AppStores;
}

export interface State {
    currentLang: string;
}

@contextToProps
@followStore(LocaleStore.name)
@followStore(PagesStore.name)
export class UII18nText extends React.Component<Props, State> {
    public render() {
        return (
            <span
                dangerouslySetInnerHTML={this.createMarkup()}
                className={this.props.className}
            />
        );
    }

    private createMarkup() {
        return {__html: this.props.i18n.translate(this.props.id, this.props.data)};
    }
}