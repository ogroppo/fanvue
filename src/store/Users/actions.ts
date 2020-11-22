import {
  GET_USERS_LOADING,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  UsersActionTypes,
  User,
} from "./types";

export function getUsersLoading(): UsersActionTypes {
  return {
    type: GET_USERS_LOADING,
  };
}
export function getUsersSuccess(users: User[]): UsersActionTypes {
  return {
    type: GET_USERS_SUCCESS,
    payload: users,
  };
}
export function getUsersFail(e: Error): UsersActionTypes {
  return {
    type: GET_USERS_FAIL,
    payload: e.message,
  };
}
