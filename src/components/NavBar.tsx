import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavBar = () => (
  <NavbarContainer>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/chat">Messages</Link>
        </li>
      </ul>
    </nav>
  </NavbarContainer>
);

const NavbarContainer = styled.section`
  position: fixed;
  width: 300px;
  min-height: 400px;
  background-color: orange;
  border: 2px solid grey;
  padding: 1rem;
  @media (max-width: 1200px) {
    display: none;
  }
`;
