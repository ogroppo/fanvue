import {
  UserState,
  UsersActionTypes,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  GET_USERS_LOADING,
} from "./types";

const initialState: UserState = {
  list: [],
  loading: false,
};

export function usersReducer(
  state = initialState,
  action: UsersActionTypes
): UserState {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        loading: false,
        list: action.payload,
        error: undefined,
      };
    case GET_USERS_LOADING:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
