import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Footer } from '../../components/Footer';
import { LateralMenu } from '../../components/LateralMenu';
import { Navbar } from '../../components/Navbar';
import { PickupContainer } from '../../components/PickupContainer';
import { StoreCard } from '../../components/RestuarantCard';
import { useSellingMethod } from '../../hooks/contexts/SellingMethod';
import { useWindowDimension } from '../../hooks/contexts/WindowDimensionContext';
import { api } from '../../services/apiClient';
import { IStoreData } from '../../store/modules/stores/types';

import {
  Container,
  Wrapper,
  Header,
  Main,
  ContentDivider,
  CardsContainer,
  AllCategoriesList,
} from '../../styles/category';

interface Data {
  storesData: {
    name: string;
    stores: IStoreData[];
  };
}

const FindCategory: NextPage<Data> = ({ storesData }) => {
  const { sellingMethod } = useSellingMethod();
  const { windowDimension } = useWindowDimension();

  return (
    <Container>
      <Wrapper>
        <Header sellingMethod={sellingMethod}>
          <Navbar />
        </Header>
      </Wrapper>

      {sellingMethod === 'delivery' && (
        <Main>
          <>
            <ContentDivider>
              {windowDimension > 1024 && (
                <LateralMenu data={storesData.stores} />
              )}

              <AllCategoriesList>
                <h2>{storesData.name}</h2>
                <CardsContainer>
                  {storesData.stores.map((store, index) => (
                    <StoreCard
                      key={String(index)}
                      id={store.id}
                      title={store.name}
                      deliveryFee={store.delivery_fee}
                      deliveryEstimatedTime={store.delivery_time}
                      image={`${api.defaults.baseURL}/stores/${store.image}`}
                      rating={9.8}
                    />
                  ))}
                </CardsContainer>
              </AllCategoriesList>
            </ContentDivider>
          </>
        </Main>
      )}

      {sellingMethod === 'pickup' && (
        <PickupContainer storesData={storesData.stores} />
      )}
      <Footer />
    </Container>
  );
};

export default FindCategory;

type ParamsType = {
  id: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as ParamsType;

  try {
    const { data: storesData } = await api.get(`/categories/${id}`);

    return {
      props: {
        storesData,
      },
      revalidate: 60 * 60 * 24,
    };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {},
    revalidate: 60 * 60 * 24,
  };
};
