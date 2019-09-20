import {connect} from 'react-redux';
import LoginForm from '../../Components/Auth';
import * as actions from './AuthActions';
import { ApplicationState } from '../App/AppTypes';

export const mapStateToProps = (state: ApplicationState) => {
  return {
    visible: state.auth.identity.authorizedAt === null,
    isError: state.auth.errorDescription.length > 0,
    errorDescription: state.auth.errorDescription
  };
}

export const mapDispatchToProps = (dispatch: any) => {
  return {
    onLoginButton: () => dispatch(actions.testLoginApi())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (LoginForm);

