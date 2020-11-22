import { RootState } from "../";

export const usersLoadingSelector = (state: RootState) => state.users.loading;
export const usersErrorSelector = (state: RootState) => state.users.error;
export const usersListSelector = (state: RootState) => state.users.list;
