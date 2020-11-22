import React from "react";
import styled from "styled-components";
import { NavBar } from "../../components/NavBar";
import { PhotoGrid } from "../../components/PhotoGrid";
import { ProfileBar } from "../../components/ProfileBar";
import { SearchBar } from "../../components/SearchBar";

export const HomePage = () => {
  return (
    <Page>
      <Container>
        <NavBar />
        <Main>
          <SearchBar target={"user"} />
          <ProfileBar />
          <PhotoGrid />
        </Main>
      </Container>
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Main = styled.main`
  width: 100%;
  @media (min-width: 900px) {
    width: 900px;
  }
  @media (min-width: 1200px) {
    margin-left: 300px;
  }
`;
