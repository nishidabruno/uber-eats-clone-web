import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Footer } from '../../components/Footer';
import { Jumbotron } from '../../components/Jumbotron';
import { MenuItem } from '../../components/MenuItem';
import { Navbar } from '../../components/Navbar';
import { ProductModal } from '../../components/ProductModal';

import { useModal } from '../../hooks/contexts/ProductModalVisibility';
import { api } from '../../services/apiClient';
import { IProduct } from '../../store/modules/cart/types';

import {
  Container,
  Wrapper,
  Header,
  StoreInfoContainer,
  StoreInfo,
  Main,
  MenuListContainer,
  Menu,
  MenuTitle,
  MenuList,
} from '../../styles/store.styles';

interface StoreProps {
  data: {
    id: string;
    name: string;
    address: string;
    delivery_time: string;
    delivery_fee: string;
    image: string;
    categories: {
      id: string;
      name: string;
    }[];
    products: {
      id: string;
      name: string;
      description: string;
      store_id: string;
      image: string;
      price: string;
    }[];
  };
}

const Store: NextPage<StoreProps> = ({ data }) => {
  const { isOpen, setIsOpen, setProduct } = useModal();

  function handleOpenProductModal(product: IProduct) {
    setProduct(product);
    setIsOpen(prev => !prev);
  }

  return (
    <>
      <Head>
        <title>Uber eats | {data.name}</title>
      </Head>
      <Container>
        {isOpen && <ProductModal />}
        <Header>
          <Wrapper>
            <Navbar showSellingMethod={false} />
          </Wrapper>

          <StoreInfoContainer>
            <Jumbotron
              image={data.image}
              title={data.name}
              deliveryFee={data.delivery_fee}
              deliveryTime={data.delivery_time}
            />
            <Wrapper>
              <StoreInfo>
                <span>
                  ¥
                  {data.categories.map(category => (
                    <Link key={category.id} href={`/category/${category.id}`}>
                      <a>{category.name}</a>
                    </Link>
                  ))}
                </span>
                <span>
                  {data.address}
                  <Link href="/">
                    <a>More stores</a>
                  </Link>
                </span>
              </StoreInfo>
            </Wrapper>
          </StoreInfoContainer>
        </Header>

        <Wrapper>
          <Main>
            <MenuListContainer>
              <Menu>
                <MenuTitle>人気の商品 Most Popular</MenuTitle>
                <MenuList>
                  {data.products.map(product => (
                    <MenuItem
                      key={product.id}
                      onClick={() => handleOpenProductModal(product)}
                      description={product.description}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                    />
                  ))}
                </MenuList>
              </Menu>
            </MenuListContainer>
          </Main>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Store;

type Params = {
  id: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as Params;
  const { data } = await api.get(`/stores/${id}`);

  return {
    props: {
      data,
    },
    revalidate: 60 * 60 * 24,
  };
};
