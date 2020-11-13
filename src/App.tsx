import Axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

interface IProfile {
  id: string;
  name: string;
  username: string;
}

interface IPhoto {
  id: string;
  thumbnailUrl: string;
  title: string;
  url: string;
}

function App() {
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await Axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        setProfiles(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingProfiles(false);
      }
    })();
  }, []);

  const [photos, setPhotots] = useState<IPhoto[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await Axios.get(
          "https://jsonplaceholder.typicode.com/photos"
        );

        // Setting the right data to show the edge case
        setPhotots(data.slice(0, 14));
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingPhotos(false);
      }
    })();
  }, []);

  const getGridPosition = useCallback(
    (index) => {
      //Repeating Pattern: 12 blocks on 6 lines
      const BLOCKS_NUMBER = 12;
      const ROWS_NUMBER = 6;
      let gcs;
      let gce;
      let grs;
      let gre;
      let pos = index % BLOCKS_NUMBER;
      let offset = Math.floor(index / BLOCKS_NUMBER) * ROWS_NUMBER;
      if (pos === 0) {
        gcs = 1;
        gce = 1;
        grs = 1 + offset;
        gre = 1 + offset;
      }
      if (pos === 1) {
        //account for the missing big image
        if (!photos[index + 1]) {
          gcs = 2;
          gce = 2;
          grs = 1 + offset;
          gre = 1 + offset;
        } else {
          gcs = 1;
          gce = 1;
          grs = 2 + offset;
          gre = 2 + offset;
        }
      }
      if (pos === 2) {
        gcs = 2;
        gce = 4;
        grs = 1 + offset;
        gre = 3 + offset;
      }
      if (pos === 6) {
        gcs = 1;
        gce = 3;
        grs = 4 + offset;
        gre = 6 + offset;
      }
      return {
        gcs,
        gce,
        grs,
        gre,
      };
    },
    [photos]
  );

  return (
    <Page>
      <Container>
        <Navbar>
          <p>Hey I'm a navbar</p>
          <p>
            Fixed Navbar 300px Responsive, it disappear if the screen is too
            small
          </p>
        </Navbar>
        <Main>
          <ProfileContainer>
            {loadingProfiles ? (
              <p>loading profiles...</p>
            ) : (
              profiles.map((profile, index) => {
                return (
                  <ProfilePic key={profile.id}>
                    <img
                      src={`http://placekitten.com/50/50?image=${index}`}
                      alt={`${profile.name} profile pic`}
                    />
                  </ProfilePic>
                );
              })
            )}
          </ProfileContainer>
          <Content>
            {loadingPhotos ? (
              <p>loading photos...</p>
            ) : (
              <PhotoGrid>
                {photos.map(({ id, thumbnailUrl, title }, index) => (
                  <Photo key={id} {...getGridPosition(index)}>
                    <span>{index + 1}</span>
                    <img src={thumbnailUrl} alt={title} />
                  </Photo>
                ))}
              </PhotoGrid>
            )}
          </Content>
        </Main>
      </Container>
    </Page>
  );
}

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

const ProfileContainer = styled.div`
  background-color: yellow;
  padding: 5px;
  width: 100%;
  height: 60px;
  overflow-x: auto;
  overflow-y: auto;
  white-space: nowrap;
`;

const ProfilePic = styled.div`
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

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 3fr);
`;

const Photo = styled.div<{
  gcs?: number;
  gce?: number;
  grs?: number;
  gre?: number;
}>`
  position: relative;
  grid-column-start: ${({ gcs }) => gcs};
  grid-column-end: ${({ gce }) => gce};
  grid-row-start: ${({ grs }) => grs};
  grid-row-end: ${({ gre }) => gre};
  img {
    height: 100%;
    width: 100%;
    vertical-align: middle;
  }
  span {
    position: absolute;
  }
`;

const Content = styled.div`
  background-color: red;
  min-height: 500px;
  overflow-y: auto;
  height: calc(100vh - 60px);
`;

const Navbar = styled.section`
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

export default App;
