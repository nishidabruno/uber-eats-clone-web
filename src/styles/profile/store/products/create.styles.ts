import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const CreateProductForm = styled.form`
  max-width: 360px;
  width: 100%;

  margin-top: 28px;

  > h2 {
    font-size: 26px;
  }

  > p {
    font-size: 16px;
    padding: 8px 0;
  }
`;

export const InputContainer = styled.div`
  div + div {
    margin-top: 8px;
  }

  margin-bottom: 16px;

  button {
    margin: 8px 0;
  }

  > span {
    display: flex;
    padding: 4px;

    color: var(--error);

    svg {
      margin-right: 4px;
    }
  }
`;
