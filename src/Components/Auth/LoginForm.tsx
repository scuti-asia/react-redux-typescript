import React, { Component } from 'react';
import {
  Button,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  Alert,
  FormControl
} from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import {FiMail, FiLock} from 'react-icons/fi';
import {
  AppHeader,
  // @ts-ignore
} from '@coreui/react';
import Header from '../../Containers/Admin/Header';

export interface Props {
  visible: boolean,
  isError: boolean,
  errorDescription?: string,
  onLoginButton: (data: object) => void,
  intl: any
}

interface State {
  fields: {
    email: string,
    password: string
  },

  isOpenLoginPopover: boolean,
  isOpenPasswordResetPopover: boolean
}

class LoginFormComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fields: {
        email: '',
        password: '',
      },
      isOpenLoginPopover: false,
      isOpenPasswordResetPopover: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onLoginButton = this.onLoginButton.bind(this);
  }

  handleChange(e: any) {
    const {fields} = this.state;
    const newValue = {...fields, [e.currentTarget.name]: e.currentTarget.value }
    this.setState({fields: newValue});
  }

  onLoginButton(e: any) {
    e.preventDefault();
    this.props.onLoginButton(this.state.fields);
  }

  render() {
    return (
      <div>
        <AppHeader fixed>
          <Header />
        </AppHeader>

        <Modal centered show={this.props.visible} onHide={() => false}>
          <Modal.Header><FormattedMessage id="Login"/></Modal.Header>
          <ModalBody>
            <Alert show={this.props.isError} variant="danger">
              {this.props.errorDescription}
            </Alert>
            <InputGroup>
              <InputGroup.Append>
                <InputGroup.Text><FiMail /></InputGroup.Text>
              </InputGroup.Append>
              <FormControl
                name="email"
                placeholder={this.props.intl.formatMessage({id: 'E-mail address'})}
                onChange={this.handleChange}
              />
            </InputGroup>
            <br/>
            <InputGroup>
              <InputGroup.Append>
                <InputGroup.Text><FiLock /></InputGroup.Text>
              </InputGroup.Append>
              <FormControl
                type="password"
                name="password"
                placeholder={this.props.intl.formatMessage({id: 'Password'})}
                onChange={this.handleChange}
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              id="login-button"
              color="primary"
              onClick={this.onLoginButton}
            ><FormattedMessage id="Login"/></Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default LoginFormComponent
