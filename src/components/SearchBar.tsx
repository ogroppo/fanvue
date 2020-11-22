import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  usersListSelector,
  usersLoadingSelector,
} from "../store/Users/selectors";
import { User } from "../store/Users/types";
import { Link } from "react-router-dom";

export const SearchBar = ({ target }: { target: "chat" | "user" }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const users = useSelector(usersListSelector);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (!debouncedSearchTerm) return setSearchResults([]);
    const searchKey = debouncedSearchTerm.toLowerCase();
    setSearchResults(
      users.filter((user) => {
        return `${user.username} ${user.name}`
          .toLowerCase()
          .includes(searchKey);
      })
    );
  }, [debouncedSearchTerm, users]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const usersLoading = useSelector(usersLoadingSelector);

  return (
    <SearchBarContainer>
      <input
        type="search"
        placeholder="Search..."
        onChange={onChangeHandler}
        value={searchTerm}
        disabled={usersLoading}
      />
      {searchResults.length > 0 && (
        <ResultList>
          {searchResults.map((user) => {
            return (
              <li key={user.id}>
                <Link
                  to={`/${target}/${user.id}`}
                  onClick={() => {
                    setSearchTerm("");
                    setSearchResults([]);
                  }}
                >
                  {user.username}
                </Link>
              </li>
            );
          })}
        </ResultList>
      )}
    </SearchBarContainer>
  );
};

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const SearchBarContainer = styled.div`
  padding: 5px 0;
  height: 45px;
  input {
    height: 2rem;
    width: 100%;
  }
`;

const ResultList = styled.ul`
  position: absolute;
  background-color: white;
  border: 1px solid black;
  z-index: 9;
  max-height: 30vh;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  top: 30px;
  li {
    padding: 5px 10px;
  }
`;
