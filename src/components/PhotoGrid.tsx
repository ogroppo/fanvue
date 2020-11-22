import Axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

interface IPhoto {
  id: string;
  thumbnailUrl: string;
  title: string;
  url: string;
}

export const PhotoGrid = () => {
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
    <Content>
      {loadingPhotos ? (
        <p>loading photos...</p>
      ) : (
        <PhotoGridContainer>
          {photos.map(({ id, thumbnailUrl, title }, index) => (
            <Photo key={id} {...getGridPosition(index)}>
              <span>{index + 1}</span>
              <img src={thumbnailUrl} alt={title} />
            </Photo>
          ))}
        </PhotoGridContainer>
      )}
    </Content>
  );
};

const PhotoGridContainer = styled.div`
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
  height: calc(100vh - 105px);
`;
