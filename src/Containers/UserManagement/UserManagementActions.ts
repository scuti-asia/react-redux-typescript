import * as constants from "./UserManagementConstants";
import * as UserManagementApi from "./UserManagementApi";
import { Dispatch } from "react";

//Action
export interface LoadUserAction {
  type: constants.LOAD_MEMBER_LIST_TYPE;
}

//Action creators
export const loadUser = (memberList): LoadUserAction => {
  return {
      type: constants.LOAD_MEMBER_LIST
  };
};

export const loadUserList = (): any => (
  dispatch: Dispatch<UserManagementActions>
): void => {
    UserManagementApi.getAllMembers().then(memberList => {
      dispatch(loadUser(memberList));
    }).catch(error => {
        throw(error);
    });
};

// export const testRequestApi = (): any => (
//   dispatch: Dispatch<ExampleActions>
// ): void => {
//   dispatch(testApi());
//   exampleApi
//     .testRequest()
//     .then(fetchedTodo => {
//       dispatch(addTodo(fetchedTodo));
//     })
//     .catch(err => {
//       console.log("handle error", err);
//     })
//     .finally(() => dispatch(testApiCompleted()));
// };

// export function loadCourses() {
//   return function(dispatch) {
//       dispatch(beginAjaxCall());
//       return courseAPI.getAllCourses().then(courses => {
//           dispatch(loadCoursesSuccess(courses));
//       }).catch(error => {
//           throw(error);
//       });
//   }
// }

export type UserManagementActions = LoadUserAction;