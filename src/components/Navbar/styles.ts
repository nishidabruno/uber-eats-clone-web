import styled from 'styled-components';

interface NavBarInterface {
  showSellingMethod?: boolean;
}

interface InputProps {
  isFocused: boolean;
}

interface CurrentSelectedProps {
  currentSellingMethod: 'delivery' | 'pickup';
}

export const Container = styled.div`
  position: relative;
  min-height: 96px;
  display: flex;
  /* flex: 1; */
  align-items: center;

  @media (max-width: 1274px) {
    flex-wrap: wrap;
    padding: 24px 0;
  }
`;

export const DrawerContainer = styled.div`
  cursor: pointer;
`;

export const Logo = styled.div`
  margin-left: 32px;

  @media (max-width: 768px) {
    margin-left: 16px;
  }
`;

export const SellingMethod = styled.div`
  max-width: 155px;
  position: relative;
  height: 48px;
  display: flex;
  align-items: center;
  border-radius: 24px;

  margin-left: 40px;
  padding: 4px;

  background-color: var(--shape_primary);
  /* 
  @media (max-width: 1440px) {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  } */
  @media (max-width: 1024px) {
    margin-left: auto;
  }
`;

export const CurrentSelected = styled.div<CurrentSelectedProps>`
  position: absolute;
  width: 50%;
  height: calc(100% - 10px);
  border-radius: 24px;

  transition: transform 0.2s;

  transform: ${props =>
    props.currentSellingMethod === 'delivery'
      ? 'translateX(0)'
      : 'translateX(70px)'};

  background-color: var(--primary);
`;

export const Delivery = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
  z-index: 10;
  border-radius: 24px;

  padding: 0 1rem;

  font-weight: 500;

  cursor: pointer;
`;

export const Pickup = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
  z-index: 10;
  border-radius: 24px;

  padding: 0 1rem;

  font-weight: 500;

  cursor: pointer;
`;

export const LocationContainer = styled.div<NavBarInterface>`
  margin-left: ${props => (props.showSellingMethod ? '16px' : '40px')};
  /* justify-self: center; */

  @media (max-width: 1024px) {
    margin-left: 0;
  }
`;

export const InputContainer = styled.div<InputProps>`
  display: flex;
  align-items: center;
  flex: 1;

  margin-left: 64px;
  padding: 16px;

  background-color: var(--shape_secondary);

  transition: box-shadow 0.3s ease-in-out;

  box-shadow: ${props =>
    props.isFocused
      ? 'inset 0px -2px 0px var(--secondary)'
      : 'inset 0px -1px 0px var(--shape_dark)'};

  > input {
    border: none;
    margin-left: 1rem;
    width: 100%;

    font-size: 1.1rem;
    background-color: var(--shape_secondary);

    &::placeholder {
      font-weight: 500;
      letter-spacing: 0.5px;
    }

    &:focus {
      outline: none;
    }
  }

  @media (max-width: 1024px) {
    min-width: 100%;

    margin-top: 10px;
    margin-left: 0px;
  }
`;

export const ButtonsContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  /* height: 100%; */
  margin-left: 24px;

  @media (max-width: 1024px) {
    min-width: 100%;
    margin-left: 0;
    padding: 10px 0;
  }
`;

export const CartContainer = styled.div``;

export const SignInContainer = styled.div`
  margin-left: 24px;
`;

export const ResposiveButtonsContainer = styled.div`
  display: flex;
  margin-left: auto;

  @media (max-width: 425px) {
    min-width: 100%;
    justify-content: space-between;
    padding: 4px 0;
  }
`;
