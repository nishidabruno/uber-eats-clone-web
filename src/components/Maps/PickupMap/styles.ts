import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: calc(100vh - 96px);

  // Mapbox popup css reset
  .mapboxgl-popup-content {
    padding: 0;
  }
  .mapboxgl-popup-tip {
    display: none;
  }
`;
