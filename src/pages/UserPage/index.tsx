import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { usersListSelector } from "../../store/Users/selectors";

interface MatchParams {
  id: string;
}

export const UserPage = ({ match }: RouteComponentProps<MatchParams>) => {
  const users = useSelector(usersListSelector);
  const user = users.find(({ id }) => id === +match.params.id);

  return (
    <div>
      <h1>User Page</h1>
      {user && <Unwrap value={user} />}
    </div>
  );
};

function Unwrap<T>({ value }: { value: T }) {
  return (
    <>
      {typeof value === "object"
        ? Object.entries(value).map(([key, value]) => (
            <div key={key}>
              <b>{key.toString()}</b>&nbsp;
              <span>
                {typeof value === "object" ? <Unwrap value={value} /> : value}
              </span>
            </div>
          ))
        : value}
    </>
  );
}
