import { Action } from "redux";
import { RootState } from "..";
import { ThunkAction } from "redux-thunk";
import Axios from "axios";
import { getUsersLoading, getUsersSuccess, getUsersFail } from "./actions";

export const getUsers = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    dispatch(getUsersLoading());
    const { data } = await Axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch(getUsersSuccess(data));
  } catch (e) {
    dispatch(getUsersFail(e));
  }
};
