import * as constants from './AppConstants';

//actions
export interface IsRequestingApiAction {
  type: constants.IS_REQUESTING_TYPE
}

export interface IsRequestingCompletedAction {
  type: constants.IS_REQUESTING_COMPLETED_TYPE
}

export interface RaiseErrorMessagesAction {
  type: constants.RAISE_ERROR_MESSAGES_TYPE,
  payload: string
}

//actions creators

export const isRequesting = (): IsRequestingApiAction => {
  return {
    type: constants.IS_REQUESTING
  }
}

export const isRequestingCompleted = (): IsRequestingCompletedAction => {
  return {
    type: constants.IS_REQUESTING_COMPLETED
  }
}

export const raiseErrorMessages = (error: string): RaiseErrorMessagesAction => {
  return {
    type: constants.RAISE_ERROR_MESSAGES,
    payload: error
  }
}

export type AppActions =
  | IsRequestingApiAction
  | IsRequestingCompletedAction
  | RaiseErrorMessagesAction