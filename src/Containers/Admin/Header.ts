import { connect } from 'react-redux';
import AdminHeader from '../../Components/AdminLayout/AdminHeader';
import { AppActions } from '../App/AppActions';
import * as actions from '../App/AppActions';
import { Dispatch } from 'react';

const mapStateToProps = (state: any, ownProps: any) => {
  let newState = Object.assign({}, ownProps);
  newState.locale = state.app.locale;
  return newState;
}

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => {
  return {
    onChangeLanguage: (locale: string) => dispatch(actions.changeLanguage(locale))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminHeader);

