import { combineReducers, Reducer } from "redux";
import {
  ExampleReducer,
  initialState as exampleInitialState
} from "../Example";
import {
  AuthReducer,
  initialState as authInitialState
} from '../Auth';
import { ApplicationState } from "./AppTypes";

const rootReducer: Reducer = combineReducers({
  example: ExampleReducer,
  auth: AuthReducer
} as any);

export const initialState: ApplicationState = {
  example: exampleInitialState,
  auth: authInitialState
};

export default rootReducer;
