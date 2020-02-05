import React, { Component } from "react";
import TodoListComponent, { TodoList } from "./TodoList";
import TodoFormComponent from "./TodoForm";
import MoldableTable from '../Parts/Table/MoldableTable';
import { Row, Button } from "react-bootstrap";
import { FormattedMessage } from 'react-intl';
import TodoFilterComponent from "./TodoFilter";
import Container from '../AdminLayout';

export interface Props {
  filter: string;
  todos: TodoList;
  addTodoItem?: (title: string) => void;
  toggleTodoItem?: (id: string) => void;
  onChangeFilter?: (filterType: string) => void;
  onTestApi: () => void;
  intl: any
}

export default class TodoComponent extends Component<Props> {
  render() {
    let { todos, filter } = this.props;
    console.log(todos)
    let showTodos = todos.filter(item => {
      switch (filter) {
        case "incompleted":
          return !item.isCompleted;
        case "completed":
          return item.isCompleted;
        default:
          return true;
      }
    });

    return (
      <Container
        pageTitle="todo"
      >
        <Row className="justify-content-md-center">
          <TodoFormComponent onAddTodo={this.props.addTodoItem} />
          <TodoListComponent
            todos={showTodos}
            toggleTodoItem={this.props.toggleTodoItem}
          />
          <TodoFilterComponent
            filtering={this.props.filter}
            onFilterChange={this.props.onChangeFilter}
          />
        </Row>
        <Row>
          <Button onClick={() => this.props.onTestApi()}><FormattedMessage id="Test Api" /></Button>
        </Row>
        <Row>
          
        </Row>
      </Container>
    );
  }
}
