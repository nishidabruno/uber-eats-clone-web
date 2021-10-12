import { FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaMapPin } from 'react-icons/fa';
import {
  FiBriefcase,
  FiCheck,
  FiClock,
  FiDollarSign,
  FiImage,
  FiMap,
  FiShoppingBag,
  FiSun,
} from 'react-icons/fi';
import { GetServerSideProps, NextPage } from 'next';
import { useModal } from '../../../hooks/contexts/ProductModalVisibility';
import { api } from '../../../services/apiClient';

import { Button } from '../../../components/Button';
import { MapModal } from '../../../components/Maps/MapModal';
import { FormInput } from '../../../components/Forms/input';
import { RectButton } from '../../../components/RectButton';

import {
  Container,
  Content,
  SignUpForm,
  InputContainer,
  CategoriesContainer,
  CategoryItem,
  CategoryTitle,
} from '../../../styles/profile/store/create';
import { ProfileSideNavbar } from '../../../components/ProfileSideNavbar';
import { withSSRAuth } from '../../../utils/withSSRAuth';

interface CoordinatesData {
  lng: number;
  lat: number;
}

interface CategoryData {
  id: string;
  name: string;
  image: string;
}

const CreateStore: NextPage = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [coordinates, setCoordinates] = useState<CoordinatesData>(
    {} as CoordinatesData
  );

  const nameRef = useRef<HTMLInputElement>(null);
  const deliveryFeeRef = useRef<HTMLInputElement>(null);
  const deliveryTimeRef = useRef<HTMLInputElement>(null);
  const openingWorkweekRef = useRef<HTMLInputElement>(null);
  const openingWeekendRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const { setIsOpen, isOpen } = useModal();
  const router = useRouter();

  function handleCoordinatesState({ lat, lng }: CoordinatesData) {
    setCoordinates({ lat, lng });
  }

  function handleCategorySelection(id: string) {
    const categoryAlreadySelected = selectedCategories.find(
      category => category === id
    );

    if (categoryAlreadySelected) {
      const filteredCategories = selectedCategories.filter(
        category => category !== id
      );

      setSelectedCategories(filteredCategories);
    } else {
      setSelectedCategories(prev => [...prev, id]);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const data = {
        name: String(nameRef.current?.value),
        delivery_fee: String(deliveryFeeRef.current?.value),
        delivery_time: String(deliveryTimeRef.current?.value),
        opening_time_workweek: String(openingWorkweekRef.current?.value),
        opening_time_weekend: String(openingWeekendRef.current?.value),
        address: String(addressRef.current?.value),
        image: imageRef.current?.files,
        coordinates: { latitude: coordinates.lat, longitude: coordinates.lng },
        categories_id: selectedCategories,
      };

      if (!data.image) return;

      const params = new FormData();

      params.append('name', data.name);
      params.append('delivery_fee', data.delivery_fee);
      params.append('delivery_time', data.delivery_time);
      params.append('opening_time_workweek', data.opening_time_workweek);
      params.append('opening_time_weekend', data.opening_time_weekend);
      params.append('address', data.address);
      params.append('image', data.image[0]);
      params.append('coordinates', JSON.stringify(data.coordinates));
      params.append('categories_id', JSON.stringify(data.categories_id));

      await api.post('/stores', params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      router.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    api.get('/categories').then(response => setCategories(response.data));
  }, []);

  return (
    <Container>
      <ProfileSideNavbar current="store" />
      <Content>
        <SignUpForm onSubmit={handleSubmit}>
          {isOpen && (
            <MapModal handleCoordinatesState={handleCoordinatesState} />
          )}
          {/* <SignUpForm onSubmit={handleSignIn}> */}
          <h2>Create a new store</h2>
          <p>Fill in all fields to create a new store</p>
          <InputContainer>
            {/* {error.map(err => (
                  <span key={err.name}>
                    <FiAlertTriangle color="#DA3633" size={14} />
                    {err.message}
                  </span>
                ))} */}
            <FormInput placeholder="Store name" type="text" ref={nameRef}>
              <FiShoppingBag size={24} />
            </FormInput>
            <FormInput
              placeholder="Delivery fee"
              type="text"
              ref={deliveryFeeRef}
            >
              <FiDollarSign size={24} />
            </FormInput>
            <FormInput
              placeholder="Delivery time"
              type="text"
              ref={deliveryTimeRef}
            >
              <FiClock size={24} />
            </FormInput>
            <FormInput
              placeholder="Opening during workweek"
              type="text"
              ref={openingWorkweekRef}
            >
              <FiBriefcase size={24} />
            </FormInput>
            <FormInput
              placeholder="Opening during weekend"
              type="text"
              ref={openingWeekendRef}
            >
              <FiSun size={24} />
            </FormInput>
            <FormInput placeholder="Store address" type="text" ref={addressRef}>
              <FiMap size={24} />
            </FormInput>
            <FormInput
              placeholder="Store image"
              type="file"
              accept="image/png image/jpeg"
              ref={imageRef}
            >
              <FiImage size={24} />
            </FormInput>
            <Button size="medium" onClick={() => setIsOpen(prev => !prev)}>
              <FaMapPin size={22} />
              <p>Pick exact store location</p>
              {coordinates.lat && (
                <FiCheck color="#419155" size={22} style={{ marginLeft: 4 }} />
              )}
            </Button>
          </InputContainer>
          <CategoriesContainer>
            {categories.map(category => (
              <CategoryItem
                key={category.id}
                onClick={() => handleCategorySelection(category.id)}
                isSelected={selectedCategories.includes(category.id)}
              >
                <Image
                  src={`${api.defaults.baseURL}/categories/${category.image}`}
                  width={60}
                  height={60}
                />
                <CategoryTitle>{category.name}</CategoryTitle>
              </CategoryItem>
            ))}
          </CategoriesContainer>

          <RectButton type="submit">
            <p>Create store</p>
          </RectButton>
        </SignUpForm>
      </Content>
    </Container>
  );
};

export default CreateStore;

export const getServerSideProps: GetServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
