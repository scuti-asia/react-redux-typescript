import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { ApplicationState } from './AppTypes';

export interface Props {
  loading: boolean;
}

export class LoadingComponent extends Component<Props> {
  render() {
    return (
      <Modal centered show={this.props.loading} dialogClassName="loading" onHide={() => false}>
        <Modal.Body>
        <div className="animated fadeIn pt-1 sk-cube-grid text-center">
          <div className="sk-cube sk-cube1"></div>
          <div className="sk-cube sk-cube2"></div>
          <div className="sk-cube sk-cube3"></div>
          <div className="sk-cube sk-cube4"></div>
          <div className="sk-cube sk-cube5"></div>
          <div className="sk-cube sk-cube6"></div>
          <div className="sk-cube sk-cube7"></div>
          <div className="sk-cube sk-cube8"></div>
          <div className="sk-cube sk-cube9"></div>
        </div>
        </Modal.Body>
      </Modal>
    )
  }
}

const mapStateToProps = (state: ApplicationState, ownProps: any) => {
  let newState = Object.assign({}, ownProps);
  newState.loading = state.app.loading;
  return newState
}

const Loading = connect(
  mapStateToProps
) (LoadingComponent)

export default Loading
