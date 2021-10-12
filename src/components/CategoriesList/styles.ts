import styled from 'styled-components';

interface ImageContainerProps {
  isHovered: boolean;
}

export const Container = styled.ul`
  display: flex;

  padding: 20px;
  width: 100%;
  overflow-x: auto;
`;

export const Categoryitem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  a {
    width: 80px;
  }

  & + li {
    margin-left: 16px;
  }
`;

export const ImageContainer = styled.div<ImageContainerProps>`
  img {
    border-radius: 50%;
    background-color: ${props =>
      props.isHovered ? 'var(--shape_primary)' : 'var(--primary)'};
  }
`;
export const TitleContainer = styled.div`
  text-align: center;
  margin-top: 8px;

  span {
    font-weight: 500;
  }
`;
