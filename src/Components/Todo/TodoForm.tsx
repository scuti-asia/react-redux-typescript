import React, { Component } from "react";
import {injectIntl} from 'react-intl';
import { Form } from "react-bootstrap";

export interface Props {
  onAddTodo?: (title: string) => void;
  intl: any
}

class TodoFormComponent extends Component<Props> {
  readonly state: {
    tmpTitle: string;
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      tmpTitle: ""
    };
  }

  onTextChange = (e: any) => {
    this.setState({
      tmpTitle: e.target.value
    });
  };

  handleKeyDown = (e: any) => {
    //Enter key
    if (this.state.tmpTitle && e.keyCode === 13 && this.props.onAddTodo) {
      this.props.onAddTodo(this.state.tmpTitle);
      this.setState({
        tmpTitle: ""
      });
    }
  };

  render() {
    return (
      <Form.Control
        type="text"
        size="lg"
        value={this.state.tmpTitle}
        placeholder={this.props.intl.formatMessage({id: 'What needs to be done?'})}
        onChange={this.onTextChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

export default injectIntl(TodoFormComponent)
