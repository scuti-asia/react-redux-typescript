import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { AuthActions } from './AuthActions';
import * as actions from './AuthActions';
import {Redirect} from 'react-router-dom';

export interface Props {
  logout: () => void
}

export class LogoutContainer extends Component<Props> {
  UNSAFE_componentWillMount() {
    this.props.logout()
  }
  render() {
    return (
      <Redirect to='/admin' />
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AuthActions>) => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

const Logout = connect(
  undefined,
  mapDispatchToProps,
)(LogoutContainer);

export default Logout
