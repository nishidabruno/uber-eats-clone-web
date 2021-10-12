import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface ContextData {
  isOpenCart: boolean;
  setIsOpenCart: Dispatch<SetStateAction<boolean>>;
}

const CartContext = createContext<ContextData>({} as ContextData);

export const CartContextProvider: React.FC = ({ children }) => {
  const [isOpenCart, setIsOpenCart] = useState(false);

  return (
    <CartContext.Provider value={{ isOpenCart, setIsOpenCart }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  return context;
}
