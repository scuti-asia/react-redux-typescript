import * as authConstants from './AuthConstants';
import * as actions from '../App/AppActions';
import {AppActions} from '../App/AppActions';
import AuthApi from './AuthApi';
import { Dispatch } from "react";

//Actions
export interface UpdateIdentityAction {
  type: authConstants.UPDATE_IDENTITY_TYPE,
  payload: {
    accessToken: string,
    refreshToken: string,
    expiresIn: number
  }
}

export interface UpdateMeAction {
  type: authConstants.UPDATE_ME_TYPE,
  me: object
}

export interface LogoutAction {
  type: authConstants.LOGOUT_TYPE
}

//Actions creators
export const updateIdentity = (payload: any): UpdateIdentityAction => {
  return {
    type: authConstants.UPDATE_IDENTITY,
    payload
  }
}

export const updateMe = (me: any): UpdateMeAction => {
  return {
    type: authConstants.UPDATE_ME,
    me
  }
}

export const logout = (): LogoutAction => {
  return {
    type: authConstants.LOGOUT
  }
}

//Thunk actions
export const testLoginApi = (data: any): any => (
  dispatch: Dispatch<AuthActions | AppActions>
): void => {
  dispatch(actions.isRequesting());
  AuthApi
    .authentications(data)
    .then(auth => {
      dispatch(updateIdentity(auth));
      AuthApi.getMe()
        .then(data => {
          dispatch(updateMe(data));
        })
    })
    .catch(err => {
      dispatch(actions.raiseErrorMessages(err));
    })
    .finally(() => dispatch(actions.isRequestingCompleted()));
};

export const testGetMe = (): any => {
  return AuthApi.getMe()
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log("handle error", err);
    })
}

export const testReAuthentications = (refreshToken: string): any => {
  return AuthApi.reAuthentications(refreshToken)
    .then(data => {
      return data
    })
    .catch(err => {
      console.log("handle error", err);
    })
}
export type AuthActions = 
  | UpdateIdentityAction
  | UpdateMeAction
  | LogoutAction
  