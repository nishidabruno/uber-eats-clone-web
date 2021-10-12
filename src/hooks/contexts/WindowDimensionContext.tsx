import { createContext, useState, useContext, useEffect } from 'react';

interface ContextData {
  windowDimension: number;
}

const WindowDimensionContenxt = createContext<ContextData>({} as ContextData);

export const WindowDimensionContextProvider: React.FC = ({ children }) => {
  const [windowDimension, setWindowDimension] = useState<number>(0);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
    window.addEventListener('resize', () => {
      setWindowDimension(window.innerWidth);
    });

    return () => window.removeEventListener('resize', () => window.innerWidth);
  }, []);

  return (
    <WindowDimensionContenxt.Provider value={{ windowDimension }}>
      {children}
    </WindowDimensionContenxt.Provider>
  );
};

export const useWindowDimension = () => {
  const context = useContext(WindowDimensionContenxt);

  return context;
};
