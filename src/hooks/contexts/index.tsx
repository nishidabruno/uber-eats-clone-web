import { NavbarDrawerContextProvider } from './NavbarDrawerContext';
import { SellingMethodContextProvider } from './SellingMethod';
import { ProductModalVisibilityContextProvider } from './ProductModalVisibility';
import { CartContextProvider } from './CartContext';
import { WindowDimensionContextProvider } from './WindowDimensionContext';
import { AuthContextProvider } from './AuthContext';
import { ProfileSideNavContextProvider } from './ProfileSideNavDrawer';

export const ContextProvider: React.FC = ({ children }) => {
  return (
    <AuthContextProvider>
      <NavbarDrawerContextProvider>
        <SellingMethodContextProvider>
          <ProductModalVisibilityContextProvider>
            <WindowDimensionContextProvider>
              <ProfileSideNavContextProvider>
                <CartContextProvider>{children}</CartContextProvider>
              </ProfileSideNavContextProvider>
            </WindowDimensionContextProvider>
          </ProductModalVisibilityContextProvider>
        </SellingMethodContextProvider>
      </NavbarDrawerContextProvider>
    </AuthContextProvider>
  );
};
