import { useState } from 'react';
import Image from 'next/image';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useModal } from '../../hooks/contexts/ProductModalVisibility';

import { RectButton } from '../RectButton';

import { api } from '../../services/apiClient';
import { useCart } from '../../hooks/contexts/CartContext';
import {
  addProductToCart,
  getCartTotal,
} from '../../store/modules/cart/actions';

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
import { ModalCloseButton } from '../ModalCloseButton';

export function ProductModal() {
  const [productQuantity, setProductQuantity] = useState(1);

  const { setIsOpen, product } = useModal();
  const { setIsOpenCart } = useCart();
  const dispatch = useDispatch();

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
          <span>
            アレルゲン情報などに関するお問い合わせは店舗に直接ご連絡いただけます:
            店舗の電話番号：[000000000]。注意：今回のご注文に関するお問い合わせはこちらの店舗番号ではなく、Uber
            Eats サポートまでご連絡ください。
          </span>
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
              Add {productQuantity} to order
            </AddtoOrderButttonTitle>
            <AddtoOrderButttonPrice>¥ {product.price}</AddtoOrderButttonPrice>
          </RectButton>
        </OrderingContainer>
      </Content>
    </Container>
  );
}
