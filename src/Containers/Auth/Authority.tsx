import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import LoginForm from './Login';
import * as authActions from './AuthActions';
import * as appActions from '../App/AppActions'
import { ApplicationState } from '../App/AppTypes';
import { AuthState } from './AuthTypes';
import { Loading } from '../App';

export interface Props extends AuthState {
  requestDone: () => void,
  requestStarted: () => void,
  logout: () => void,
  reAuthenticate: (refreshToken: string) => void,
  requestMe: () => void,
  intl: any
}

interface State {
  isInitialized: boolean
}

class AuthorityContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      // `true` when initialized.
      isInitialized: false,
    };
    this.initialized = this.initialized.bind(this);
  }

  isLogout() {
    return !this.props.identity.refreshToken && !this.props.identity.accessToken && !this.props.me;
  }

  /**
   * When should logout, return `true`.
   *
   * @returns {boolean}
   */
  shouldLogout() {
    return !this.props.identity.refreshToken ||
      (!this.props.identity.refreshToken && !this.props.identity.accessToken);
  }

  /**
   * When should re-authenticate, return `true`.
   *
   * @returns {boolean}
   */
  shouldReAuthenticate() {
    const expiresIn = moment(this.props.identity.expiresIn, 'x');
    // Expire within 5 minutes.
    return expiresIn.isBefore(moment().add(5, 'minutes'));
  }

  /**
   * When should request `me`, return `true`.
   *
   * @returns {boolean}
   */
  shouldRequestMe() {
    return !this.props.me;
  }

  /**
   * Re-authentication to get a new access token by a refresh token.
   *
   * @returns {Promise<void>}
   */
  async reAuthenticate() {
    return await this.props.reAuthenticate(this.props.identity.refreshToken);
  }

  /**
   * To get `me` by API.
   *
   * @returns {Promise<any>}
   */
  async requestMe() {
    //You can use http to request info of user here
    return await this.props.requestMe()
  }

  /**
   * confirm existence of a user by API.
   *
   * - Logout if there is no refresh token and access token.
   *   - `me` and `identity` will be remove when logout.
   * - Re-authenticate if `identity` almost expire.
   * - Request `me` if there is `identity` but no `me`
   *   - A reason of why do this is `me` is not persisted, so it needs to be get every HTTP request.
   *
   * @param {function} cb Callback after perform the method
   * @returns {Promise<*>}
   */
  async confirmExistence() {
    let response;
    if (!this.isLogout()) {
      this.props.requestStarted();
      if (this.shouldLogout()) {
        this.props.logout();
        return this.props.requestDone();
      }

      if (this.shouldReAuthenticate()) {
        response = await this.reAuthenticate();
        //if you want save set token on http you can do that actions here
      }

      if (this.shouldRequestMe()) {
        response = await this.requestMe();
      }
    }
    return response;
  }

  /**
   * Perform before render.
   *
   * - Perform `this.initialized()` as callback of `this.confirmExistence`.
   *
   * @returns {Promise<*>}
   */
  UNSAFE_componentWillMount() {
    const response = this.confirmExistence()
    return this.initialized(response)
  }

  /**
   * Perform after initialize.
   *
   * @param response `Promise` from `this.confirmExistence`
   * @returns {*}
   */
  initialized(response: any) {
    this.props.requestDone();
    this.setState({isInitialized: true});

    return response;
  }

  loading() {
    return (
      <Loading />
    );
  }

  render() {
    if (this.props.me === null) {
      return (
        <Suspense fallback={this.loading()}>
          <Loading />
          <LoginForm />
        </Suspense>
      );
    }

    return (<div><Loading/>{this.props.children}</div>);
  };
}

const mapStateToProps = (state: ApplicationState, ownProps: any) => {
  let newState = Object.assign({}, ownProps);
  
  newState.me = state.auth.me;
  newState.identity = state.auth.identity;
  return newState 
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    requestStarted: () => dispatch(appActions.isRequesting()),
    requestDone: () => {
      dispatch(appActions.isRequestingCompleted())
    },
    logout: () => {
      dispatch(authActions.logout())
    },
    requestMe: () => dispatch(authActions.getMe()),
    reAuthenticate: (refreshToken: string) => dispatch(authActions.reAuthenticate(refreshToken))
  }
}

const Authority = connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(AuthorityContainer))

export default Authority
