import styled from 'styled-components';

interface CategoryItemProps {
  isSelected: boolean;
}

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
  padding: 16px;
`;

export const CreateStoreForm = styled.form`
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

export const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const CategoryItem = styled.div<CategoryItemProps>`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  padding: 2px;
  margin: 2px;
  border-radius: 16px;
  cursor: pointer;

  transition: border 0.2s;

  &:hover {
    border: 2px solid var(--shape_dark);
  }

  border: 2px solid
    ${props => (props.isSelected ? 'var(--green)' : 'transparent')};
`;

export const CategoryTitle = styled.span`
  font-weight: 500;
`;
