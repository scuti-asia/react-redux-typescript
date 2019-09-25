import { AuthState } from './AuthTypes';
import { AuthActions } from './AuthActions';

export const initialState: AuthState = {
  identity: {
    authorizedAt: null,
    accessToken: null,
    refreshToken: null,
    expiresIn: null
  },
  me: null
}

const AuthReducer = (
  state: AuthState = initialState,
  action: AuthActions,
): AuthState => {
  switch(action.type) {
    case 'UPDATE_IDENTITY':
      return {
        ...state,
        identity: {
          ...action.payload
        }
      }

    case 'UPDATE_ME':
      return {
        ...state,
        me: action.me
      };

    case 'LOGOUT':
      return {
        ...state,
        me: null,
          identity: {
          accessToken: null,
          refreshToken: null,
          expiresIn: null,
          authorizedAt: null
        }
      };
    default:
    return state;
  }
}

export default AuthReducer;
