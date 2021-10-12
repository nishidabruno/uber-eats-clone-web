import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

interface ProductData {
  id: string;
  name: string;
  description: string;
  store_id: string;
  image: string;
  price: string;
}

interface ContextData {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setProduct: Dispatch<SetStateAction<ProductData>>;
  product: ProductData;
}

const ProductModalVisibilityContext = createContext<ContextData>(
  {} as ContextData
);

export const ProductModalVisibilityContextProvider: React.FC = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<ProductData>({} as ProductData);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'visible';
  }, [isOpen]);

  return (
    <ProductModalVisibilityContext.Provider
      value={{ isOpen, setIsOpen, setProduct, product }}
    >
      {children}
    </ProductModalVisibilityContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ProductModalVisibilityContext);

  return context;
};
