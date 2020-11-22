import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import { usersErrorSelector } from "./store/Users/selectors";
import { getUsers } from "./store/Users/thunks";
import { HomePage } from "./pages/HomePage";
import { UserPage } from "./pages/UserPage";
import { ChatPage } from "./pages/ChatPage";

function App() {
  const dispatch = useDispatch();

  const usersError = useSelector(usersErrorSelector);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (usersError) alert(usersError); //Hopefully not in scope to have a Notification system here :)
  }, [usersError]);

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/user/:id" component={UserPage} />
      <Route path="/chat/:id?" component={ChatPage} />
    </Switch>
  );
}

export default App;
