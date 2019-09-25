import {connect} from 'react-redux';
import LoginForm from '../../Components/Auth';
import { AuthActions } from './AuthActions';
import * as actions from './AuthActions';
import { ApplicationState } from '../App/AppTypes';
import { Dispatch } from 'react';

export const mapStateToProps = (state: ApplicationState) => {
  return {
    visible: state.auth.identity.authorizedAt === null,
    isError: state.app.errorDescription !== null,
    errorDescription: state.app.errorDescription
  };
}

export const mapDispatchToProps = (dispatch: Dispatch<AuthActions>) => {
  return {
    onLoginButton: (data: any) => dispatch(actions.authentications(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (LoginForm);

