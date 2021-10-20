import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

interface ContextData {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ProfileSideNavContext = createContext({} as ContextData);

export const ProfileSideNavContextProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ProfileSideNavContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ProfileSideNavContext.Provider>
  );
};

export function useProfileSideNavBar() {
  const context = useContext(ProfileSideNavContext);

  return context;
}
