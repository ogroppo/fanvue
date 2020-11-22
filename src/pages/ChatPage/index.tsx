import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { SearchBar } from "../../components/SearchBar";
import { RootState } from "../../store";
import { sendMessage } from "../../store/Chat/actions";
import { usersListSelector } from "../../store/Users/selectors";

interface MatchParams {
  id: string;
}

export const ChatPage = ({ match }: RouteComponentProps<MatchParams>) => {
  const users = useSelector(usersListSelector);
  const [message, setMessage] = useState("");
  const userId = +match.params.id;
  const chat = useSelector((state: RootState) => state.chats[userId]);

  const dispatch = useDispatch();

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (message) {
      dispatch(sendMessage(userId, message));
      setMessage("");
    }
  };

  return (
    <Container>
      <UsersList isListRoute={!userId}>
        <SearchBar target="chat" />
        {users.length > 0 && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <Link to={`/chat/${user.id}`}>{user.username}</Link>
              </li>
            ))}
          </ul>
        )}
      </UsersList>
      {!!userId && (
        <ChatArea>
          <Messages>
            {chat &&
              chat.map((message, index) => (
                <Message key={index}>
                  <span>{message}</span>
                </Message>
              ))}
          </Messages>
          <form onSubmit={onSubmitHandler}>
            <input
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <button type="submit" disabled={!message}>
              Send
            </button>
          </form>
        </ChatArea>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const Messages = styled.div`
  height: 100%;
  padding: 1em 0.5em 40px 1em;
  overflow-y: auto;
`;

const Message = styled.div`
  overflow: hidden;
  margin-bottom: 1em;
  span {
    float: right;
    border-radius: 5px;
    background-color: blue;
    color: white;
    padding: 0.5em;
  }
`;

const UsersList = styled.div<{ isListRoute: boolean }>`
  border-right: 1px solid grey;
  height: 100vh;
  overflow-y: hidden;
  min-width: 300px;
  background-color: lightyellow;
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin: 1em;
  }
  ${({ isListRoute }) =>
    isListRoute
      ? `
      @media (max-width: 900px) {
        width: 100%;
      }
    `
      : `
      @media (max-width: 900px) {
        display: none;
      }
    `}
`;

const ChatArea = styled.div`
  height: 100vh;
  flex-grow: 1;
  background-color: wheat;
  position: relative;
  form {
    position: absolute;
    display: flex;
    width: 100%;
    bottom: 0;
    height: 40px;
    padding: 5px;
  }
  input {
    flex-grow: 1;
  }
  button {
    width: 100px;
  }
`;
