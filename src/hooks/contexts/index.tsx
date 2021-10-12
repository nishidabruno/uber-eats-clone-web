import { NavbarDrawerContextProvider } from './NavbarDrawerContext';
import { SellingMethodContextProvider } from './SellingMethod';
import { ProductModalVisibilityContextProvider } from './ProductModalVisibility';
import { CartContextProvider } from './CartContext';
import { WindowDimensionContextProvider } from './WindowDimensionContext';
import { AuthContextProvider } from './AuthContext';

export const ContextProvider: React.FC = ({ children }) => {
  return (
    <AuthContextProvider>
      <NavbarDrawerContextProvider>
        <SellingMethodContextProvider>
          <ProductModalVisibilityContextProvider>
            <WindowDimensionContextProvider>
              <CartContextProvider>{children}</CartContextProvider>
            </WindowDimensionContextProvider>
          </ProductModalVisibilityContextProvider>
        </SellingMethodContextProvider>
      </NavbarDrawerContextProvider>
    </AuthContextProvider>
  );
};
