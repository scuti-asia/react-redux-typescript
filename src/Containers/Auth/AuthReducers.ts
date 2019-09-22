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
			let newState = Object.assign({}, state);
			newState.identity.accessToken = action.payload.accessToken;
			newState.identity.refreshToken = action.payload.refreshToken;
			newState.identity.expiresIn = action.payload.expiresIn;
			newState.identity.authorizedAt = new Date();
			
			return newState;
		
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
		return state
	}
}

export default AuthReducer;