import type { GetServerSideProps, NextPage } from 'next';
import { Footer } from '../../components/Footer';
import { LateralMenu } from '../../components/LateralMenu';
import { Navbar } from '../../components/Navbar';
import { PickupContainer } from '../../components/PickupContainer';
import { StoreCard } from '../../components/RestuarantCard';
import { useSellingMethod } from '../../hooks/contexts/SellingMethod';
import { useWindowDimension } from '../../hooks/contexts/WindowDimensionContext';
import { api } from '../../services/apiClient';
import { imagesApi } from '../../services/imagesApi';
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
  storesData: IStoreData[];
}

const FindStore: NextPage<Data> = ({ storesData }) => {
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
              {windowDimension > 1024 && <LateralMenu data={storesData} />}

              <AllCategoriesList>
                {storesData.length >= 1 ? (
                  <>
                    <CardsContainer>
                      {storesData.map((store, index) => (
                        <StoreCard
                          key={String(index)}
                          id={store.id}
                          title={store.name}
                          deliveryFee={store.delivery_fee}
                          deliveryEstimatedTime={store.delivery_time}
                          image={`${imagesApi.baseURL}/stores/${store.image}`}
                          rating={9.8}
                        />
                      ))}
                    </CardsContainer>
                  </>
                ) : (
                  <h2>Store not found! :(</h2>
                )}
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

export default FindStore;

type ParamsType = {
  name: string;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { name } = query as ParamsType;

  try {
    const { data: storesData } = await api.get(`/stores/search/?name=${name}`);

    return {
      props: {
        storesData,
      },
    };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {},
  };
};
