import {connect} from 'react-redux';
import LoginForm from '../../Components/Auth';
import * as actions from './AuthActions';
import { ApplicationState } from '../App/AppTypes';

export const mapStateToProps = (state: ApplicationState) => {
  return {
    visible: state.auth.identity.authorizedAt === null,
    isError: state.app.errorDescription.length > 0,
    errorDescription: state.app.errorDescription
  };
}

export const mapDispatchToProps = (dispatch: any) => {
  return {
    onLoginButton: (data: any) => dispatch(actions.testLoginApi(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (LoginForm);

