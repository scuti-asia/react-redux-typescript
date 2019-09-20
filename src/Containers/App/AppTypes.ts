import { ExampleState } from "../Example/ExampleTypes";
import { AuthState } from '../Auth/AuthTypes';

export interface ApplicationState {
  example: ExampleState;
  auth: AuthState;
}
