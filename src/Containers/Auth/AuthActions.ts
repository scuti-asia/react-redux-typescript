import * as authConstants from './AuthConstants';
import * as exampleConstants from '../Example/ExampleConstants';
import {TestRequestApiAction, TestRequestApiCompletedAction} from '../Example/ExampleActions';
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

export const testApi = (): TestRequestApiAction => {
  return {
    type: exampleConstants.TEST_REQUEST_API
  };
};
export const testApiCompleted = (): TestRequestApiCompletedAction => {
  return {
    type: exampleConstants.TEST_REQUEST_API_COMPLETED
  };
};

export const logout = (): LogoutAction => {
  return {
    type: authConstants.LOGOUT
  }
}

//Thunk actions
export const testLoginApi = (): any => (
  dispatch: Dispatch<AuthActions>
): void => {
  dispatch(testApi());
  AuthApi
    .authentications()
    .then(auth => {
      dispatch(updateIdentity(auth));
      AuthApi.getMe()
        .then(data => {
          dispatch(updateMe(data))
        })
    })
    .catch(err => {
      console.log("handle error", err);
    })
    .finally(() => dispatch(testApiCompleted()));
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

export const testReAuthentications = (): any => {
  return AuthApi.authentications()
    .then(data => {
      console.log(data);
      return data
    })
    .catch(err => {
      console.log("handle error", err);
    })
}
export type AuthActions = 
| UpdateIdentityAction
| UpdateMeAction
| TestRequestApiAction
| TestRequestApiCompletedAction
| LogoutAction