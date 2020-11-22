import { combineReducers } from "redux";
import { usersReducer } from "./Users/reducer";
import { chatReducer } from "./Chat/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { Store, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Middleware } from "redux";

export const logger: Middleware = (store) => (next) => (action) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(action);
  }
  return next(action);
};

const rootReducer = combineReducers({
  users: usersReducer,
  chats: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function configureStore(initialState?: RootState): Store<RootState> {
  let middleware = applyMiddleware(thunk, logger);

  if (process.env.NODE_ENV !== "production") {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(
    rootReducer as any,
    initialState as any,
    middleware
  ) as Store<RootState>;

  return store;
}
