import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

interface ContextData {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const NavbarDrawerContext = createContext<ContextData>({} as ContextData);

export const NavbarDrawerContextProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'visible';
  }, [isOpen]);

  return (
    <NavbarDrawerContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </NavbarDrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const context = useContext(NavbarDrawerContext);

  return context;
};
