import type { GetStaticProps, NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { CategoriesList } from '../components/CategoriesList';
import { PromotionSlider } from '../components/PromotionSlider';
import { StoreCard } from '../components/RestuarantCard';
import { LateralMenu } from '../components/LateralMenu';
import { Footer } from '../components/Footer';
import { PickupContainer } from '../components/PickupContainer';

import {
  Container,
  Wrapper,
  Header,
  Main,
  ContentDivider,
  CardsContainer,
  AllCategoriesList,
} from '../styles/home.styles';
import { useSellingMethod } from '../hooks/contexts/SellingMethod';
import { useWindowDimension } from '../hooks/contexts/WindowDimensionContext';
import { api } from '../services/apiClient';
import { setStores } from '../store/modules/stores/actions';
import { IState } from '../store';
import { IStoreData } from '../store/modules/stores/types';

const adBannersData = [
  {
    image: '/assets/banners/ad_20off.png',
  },
  {
    image: '/assets/banners/ad_1800off.png',
  },
  {
    image: '/assets/banners/ad_2200off.jpg',
  },
  {
    image: '/assets/banners/ad_job.jpg',
  },
  {
    image: '/assets/banners/ad_udon.png',
  },
  {
    image: '/assets/banners/ad_udon.png',
  },
];

interface CategoriesListProps {
  id: string;
  name: string;
  image: string;
}

interface Data {
  storesData: IStoreData[];
  categoriesData: CategoriesListProps[];
}

const Home: NextPage<Data> = ({ storesData, categoriesData }) => {
  const { sellingMethod } = useSellingMethod();
  const { windowDimension } = useWindowDimension();

  const dispatch = useDispatch();
  const stores = useSelector<IState, IStoreData[]>(
    state => state.stores.storesData
  );

  useEffect(() => {
    dispatch(setStores(storesData));
  }, [dispatch, storesData]);

  return (
    <Container>
      <Wrapper>
        <Header sellingMethod={sellingMethod}>
          <Navbar />

          {sellingMethod === 'delivery' && (
            <CategoriesList categoriesData={categoriesData} />
          )}
        </Header>
      </Wrapper>

      {sellingMethod === 'delivery' && (
        <Main>
          <>
            <PromotionSlider data={adBannersData} />

            <ContentDivider>
              {windowDimension > 1024 && <LateralMenu data={storesData} />}

              <AllCategoriesList>
                <h2>All stores</h2>
                <CardsContainer>
                  {stores.map(store => (
                    <StoreCard
                      key={store.id}
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
        <PickupContainer storesData={storesData} />
      )}
      <Footer />
    </Container>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { data: storesData } = await api.get('/stores');
  const { data: categoriesData } = await api.get('/categories');

  return {
    props: {
      storesData,
      categoriesData,
    },
    revalidate: 60,
  };
};
