import type { GetStaticProps, NextPage } from 'next';
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

interface StoresData {
  id: string;
  name: string;
  delivery_fee: string;
  delivery_time: string;
  image: string;
  coordinates_id: {
    latitude: string;
    longitude: string;
  };
}

interface CategoriesListProps {
  id: string;
  name: string;
  image: string;
}

interface Data {
  storesData: StoresData[];
  categoriesData: CategoriesListProps[];
}

const Home: NextPage<Data> = ({ storesData, categoriesData }) => {
  const { sellingMethod } = useSellingMethod();
  const { windowDimension } = useWindowDimension();

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
              {windowDimension > 1024 && <LateralMenu />}

              <AllCategoriesList>
                <h2>All stores</h2>
                <CardsContainer>
                  {storesData.map((store, index) => (
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
    revalidate: 60 * 60 * 24,
  };
};
