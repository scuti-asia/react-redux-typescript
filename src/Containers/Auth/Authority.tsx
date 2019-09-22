import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import LoginForm from './Login';
import * as actions from './AuthActions';
import * as authActions from '../App/AppActions'
import { ApplicationState } from '../App/AppTypes';

export interface Props {
  me: any,
  identity: {
    authorizedAt?: any,
    accessToken: string,
    refreshToken: string,
    expiresIn: number
  },
  requestDone: () => void,
  requestStarted: () => void,
  logout: () => void,
  updateIdentity: (data: any) => void,
  updateMe: (data: any) => void,
}

class AuthorityContainer extends Component<Props> {
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
    const expiresIn = moment(this.props.identity.expiresIn * 1000, 'x');
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
    //you can use http to re-auth here!
    return await actions.testReAuthentications(this.props.identity.refreshToken)
  }

  /**
   * To get `me` by API.
   *
   * @returns {Promise<any>}
   */
  async requestMe() {
    //You can use http to request info of user here
    return await actions.testGetMe
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
  async confirmExistence(cb = undefined) {
    let response;
    if (!this.isLogout()) {
      this.props.requestStarted();
      if (this.shouldLogout()) {
        this.props.logout();
        return this.props.requestDone();
      }

      if (this.shouldReAuthenticate()) {
        response = await this.reAuthenticate();
        this.props.updateIdentity(response);
        //if you want save set token on http you can do that actions here
      }

      if (this.shouldRequestMe()) {
        response = await this.requestMe();
        this.props.updateMe(response);
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
  componentWillMount() {
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
      <div className="animated fadeIn pt-1 text-center">
        <div className="sk-spinner sk-spinner-pulse"/>
      </div>
    );
  }

  render() {
    if (this.props.me === null) {
      return (
        <Suspense fallback={this.loading()}>
          <LoginForm />
        </Suspense>
      );
    }
    return (<div>{this.props.children}</div>);
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
    requestStarted: () => dispatch(authActions.isRequesting),
    requestDone: () => dispatch(authActions.isRequestingCompleted),
    logout: () => dispatch(actions.logout),
    updateIdentity: (res: any) => dispatch(actions.updateIdentity(res)),
    updateMe: (data: any) => dispatch(actions.updateMe(data)),
  }
}

const Authority = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorityContainer)

export default Authority
