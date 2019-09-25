import { UserState } from "./UserManagementTypes";
import { UserManagementActions } from "./UserManagementActions";
import { LOAD_MEMBER_LIST } from "./UserManagementConstants";
import uuid from "uuid/v4";

export const initialState: UserState = {
  users : []
};

const userManagementReducer = (
  state : UserState = initialState, 
  action: UserManagementActions
): UserState => {
  switch (action.type) {
    case LOAD_MEMBER_LIST:
      return {
        ...state // sua sau
      }
    default:
      return state;
    }
  };

  export default userManagementReducer;