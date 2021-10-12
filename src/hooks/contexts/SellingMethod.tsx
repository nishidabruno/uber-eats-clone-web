import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

interface ContextData {
  sellingMethod: 'delivery' | 'pickup';
  setSellingMethod: Dispatch<SetStateAction<'delivery' | 'pickup'>>;
}

const SellingMethodContext = createContext<ContextData>({} as ContextData);

export const SellingMethodContextProvider: React.FC = ({ children }) => {
  const [sellingMethod, setSellingMethod] = useState<'delivery' | 'pickup'>(
    'delivery'
  );

  return (
    <SellingMethodContext.Provider value={{ sellingMethod, setSellingMethod }}>
      {children}
    </SellingMethodContext.Provider>
  );
};

export const useSellingMethod = () => {
  const context = useContext(SellingMethodContext);

  return context;
};
