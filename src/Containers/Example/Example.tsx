import Todo from "../../Components/Todo";
import {injectIntl} from 'react-intl';
import { ApplicationState } from "../App/AppTypes";
import * as actions from "./ExampleActions";
import { connect } from "react-redux";
import { Dispatch } from "react";

export const mapStateToProps = (state: ApplicationState) => {
  return {
    todos: state.example.todos,
    filter: state.example.filter
  };
};
export const mapDispatchToProps = (
  dispatch: Dispatch<actions.ExampleActions>
) => {
  return {
    addTodoItem: (title: string) => dispatch(actions.addTodo(title)),
    toggleTodoItem: (item: string) => dispatch(actions.toggleTodo(item)),
    onChangeFilter: (filter: string) => dispatch(actions.changeFilter(filter)),
    onTestApi: () => dispatch(actions.testRequestApi())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Todo));
