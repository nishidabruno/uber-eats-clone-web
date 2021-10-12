import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1920px;
  height: 100vh;

  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 1024px) {
    padding: 0 16px;
  }
`;

export const AuthContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const SignUpForm = styled.form`
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

  span {
    display: flex;
    padding: 4px;

    color: var(--error);

    svg {
      margin-right: 4px;
    }
  }
`;

export const InputContainer = styled.div`
  div + div {
    margin-top: 8px;
  }

  margin-bottom: 16px;
`;

export const LoginOptionContainer = styled.div`
  margin-top: 8px;
  display: flex;

  > p {
    color: var(--text_detail);
  }

  > a {
    margin-left: 2px;
    color: var(--success);
    font-weight: 500;
  }
`;
