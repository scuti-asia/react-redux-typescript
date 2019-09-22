import { combineReducers, Reducer } from "redux";
import {
  ExampleReducer,
  initialState as exampleInitialState
} from "../Example";
import {
  AuthReducer,
  initialState as authInitialState
} from '../Auth';
import { AppActions } from './AppActions';
import { ApplicationState, ApplicationCommonState } from "./AppTypes";

const appCommonState: ApplicationCommonState = {
  loading: false,
  errorDescription: '',
}

export const AppReducer = (
  state: ApplicationCommonState = appCommonState,
  action: AppActions
): ApplicationCommonState => {
  switch(action.type) {
    case "IS_REQUESTING":
      return {
        ...state,
        loading: true,
        errorDescription: ''
      };
    case "IS_REQUESTING_COMPLETED":
      return {
        ...state,
        loading: false
      };
    case "RAISE_ERROR_MESSAGES":
      return {
        ...state,
        errorDescription: action.payload
      }
    default:
      return state;
  }
}

const rootReducer: Reducer = combineReducers({
  example: ExampleReducer,
  auth: AuthReducer,
  app: AppReducer
} as any);

export const initialState: ApplicationState = {
  example: exampleInitialState,
  auth: authInitialState,
  app: appCommonState
};

export default rootReducer;
