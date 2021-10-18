import { useState } from 'react';
import Image from 'next/image';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { useModal } from '../../hooks/contexts/ProductModalVisibility';
import { ModalCloseButton } from '../ModalCloseButton';
import { RectButton } from '../RectButton';
import { api } from '../../services/apiClient';
import { useCart } from '../../hooks/contexts/CartContext';
import {
  addProductToCart,
  getCartTotal,
} from '../../store/modules/cart/actions';
import { en } from '../../content/locale';

import {
  Container,
  Background,
  Content,
  ImageContainer,
  ProductDetails,
  OrderingContainer,
  AddRemoveButton,
  AddtoOrderButttonTitle,
  AddtoOrderButttonPrice,
  ProductCountContainer,
} from './styles';

export function ProductModal() {
  const [productQuantity, setProductQuantity] = useState(1);

  const { setIsOpen, product } = useModal();
  const { setIsOpenCart } = useCart();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const f = (id: keyof typeof en) => formatMessage({ id });

  function handleCloseProductModal() {
    setIsOpen(prev => !prev);
  }

  function handleAddProductQuantity() {
    setProductQuantity(prev => prev + 1);
  }

  function handleRemoveProductQuantity() {
    if (productQuantity === 1) {
      return;
    }
    setProductQuantity(prev => prev - 1);
  }

  function handleAddProductToCart() {
    dispatch(addProductToCart(product, productQuantity));
    dispatch(getCartTotal());
    setIsOpen(prev => !prev);
    setIsOpenCart(prev => !prev);
  }

  return (
    <Container>
      <Background onClick={handleCloseProductModal} />
      <Content>
        <ImageContainer>
          <Image
            src={`${api.defaults.baseURL}/products/${product.image}`}
            width={676}
            height={400}
            objectFit="cover"
            layout="responsive"
          />
          <ModalCloseButton onClick={handleCloseProductModal} />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <span>{f('PRODUCT_MODAL_ALLERGY_WARNING_TEXT')}</span>
        </ProductDetails>
        <OrderingContainer>
          <ProductCountContainer>
            <AddRemoveButton onClick={handleRemoveProductQuantity}>
              <FiMinus size={24} />
            </AddRemoveButton>
            <span>{productQuantity}</span>
            <AddRemoveButton onClick={handleAddProductQuantity}>
              <FiPlus size={24} />
            </AddRemoveButton>
          </ProductCountContainer>
          <RectButton onClick={handleAddProductToCart}>
            <p />
            <AddtoOrderButttonTitle>
              {f('PRODUCT_MODAL_ADD_TO_ORDER_TEXT_START')} {productQuantity}{' '}
              {f('PRODUCT_MODAL_ADD_TO_ORDER_TEXT_END')}
            </AddtoOrderButttonTitle>
            <AddtoOrderButttonPrice>¥ {product.price}</AddtoOrderButttonPrice>
          </RectButton>
        </OrderingContainer>
      </Content>
    </Container>
  );
}
