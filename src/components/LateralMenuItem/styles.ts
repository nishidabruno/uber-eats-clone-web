import styled from 'styled-components';

interface DrawingContainerProps {
  isOpen: boolean;
}

export const Container = styled.li<DrawingContainerProps>`
  display: flex;
  flex-direction: column;
  max-height: ${props => (props.isOpen ? '100%' : '4vh')};
  overflow: hidden;

  margin-top: 28px;
`;

export const DrawingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  height: 10%;

  > button {
    background-color: var(--primary);
  }

  h3 {
    font-size: 18px;
  }
`;
