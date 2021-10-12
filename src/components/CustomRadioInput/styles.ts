import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 25px;
  user-select: none;

  cursor: pointer;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;

    border: 4px solid var(--shape_dark);

    background-color: var(--primary);
  }

  & input:checked ~ span {
    border: 9px solid var(--secondary);
    background-color: var(--primary);
  }
`;
