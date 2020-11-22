export interface User {
  id: number;
  name: string;
  username: string;
}

export interface UserState {
  list: User[];
  loading: boolean;
  error?: string;
}

export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAIL = "GET_USERS_FAIL";
export const GET_USERS_LOADING = "GET_USERS_LOADING";

interface GetUsersSuccessAction {
  type: typeof GET_USERS_SUCCESS;
  payload: User[];
}

interface GetUsersFailAction {
  type: typeof GET_USERS_FAIL;
  payload: UserState["error"];
}

interface GetUsersLoadingAction {
  type: typeof GET_USERS_LOADING;
}

export type UsersActionTypes =
  | GetUsersSuccessAction
  | GetUsersFailAction
  | GetUsersLoadingAction;
