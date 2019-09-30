import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ApplicationState } from './AppTypes';
import i18n from '../../Lib/i18n';

interface Props {
  locale: string,
  children: React.ReactNode
}

export class IntlProviderWrapper extends Component<Props> {
  render() {
    const { locale } = this.props;
    return (
      <IntlProvider locale={locale} messages={i18n.messages[locale]}>
        {this.props.children}
      </IntlProvider>
    )
  }
}

const mapStateToProps = (state: ApplicationState, ownProps: any) => {
  let newState = Object.assign({}, ownProps);
  newState.locale = state.app.locale;
  return newState;
}

export default connect(
  mapStateToProps
)(IntlProviderWrapper);
