import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  usersListSelector,
  usersLoadingSelector,
} from "../store/Users/selectors";
import { Link } from "react-router-dom";

export const ProfileBar = () => {
  const users = useSelector(usersListSelector);
  const usersLoading = useSelector(usersLoadingSelector);

  return (
    <ProfileContainer>
      {usersLoading ? (
        <p>loading profiles...</p>
      ) : (
        users.map((user, index) => {
          return (
            <ProfilePic key={user.id} to={`/user/${user.id}`}>
              <img
                src={`http://placekitten.com/50/50?image=${index}`}
                alt={`${user.name} profile pic`}
              />
            </ProfilePic>
          );
        })
      )}
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  background-color: yellow;
  padding: 5px;
  width: 100%;
  height: 60px;
  overflow-x: auto;
  overflow-y: auto;
  white-space: nowrap;
`;

const ProfilePic = styled(Link)`
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  height: 50px;
  width: 50px;
  display: inline-block;
  img {
    height: 100%;
    width: 100%;
    float: left;
  }
`;
