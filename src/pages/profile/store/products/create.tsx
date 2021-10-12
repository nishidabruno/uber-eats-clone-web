import { FormEvent, useRef } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  FiDollarSign,
  FiFileText,
  FiImage,
  FiShoppingBag,
} from 'react-icons/fi';

import {
  Container,
  Content,
  SignUpForm,
  InputContainer,
} from '../../../../styles/profile/store/products/create.styles';
import { api } from '../../../../services/apiClient';
import { ProfileSideNavbar } from '../../../../components/ProfileSideNavbar';
import { FormInput } from '../../../../components/Forms/input';
import { RectButton } from '../../../../components/RectButton';
import { withSSRAuth } from '../../../../utils/withSSRAuth';

const CreateStoreProduct: NextPage = () => {
  const productNameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const data = {
        name: String(productNameRef.current?.value),
        description: String(descriptionRef.current?.value),
        price: String(priceRef.current?.value),
        image: imageRef.current?.files,
      };

      if (!data.image) return;

      const params = new FormData();

      params.append('name', data.name);
      params.append('description', data.description);
      params.append('price', data.price);
      params.append('image', data.image[0]);

      await api.post('/products', params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      router.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <ProfileSideNavbar current="store" />
      <Content>
        <SignUpForm onSubmit={handleSubmit}>
          {/* <SignUpForm onSubmit={handleSignIn}> */}
          <h2>Create a new store product</h2>
          <p>Fill in all fields to create a new product</p>
          <InputContainer>
            {/* {error.map(err => (
                  <span key={err.name}>
                    <FiAlertTriangle color="#DA3633" size={14} />
                    {err.message}
                  </span>
                ))} */}
            <FormInput
              placeholder="Product name"
              type="text"
              ref={productNameRef}
            >
              <FiShoppingBag size={24} />
            </FormInput>
            <FormInput
              placeholder="Description"
              type="text"
              ref={descriptionRef}
            >
              <FiFileText size={24} />
            </FormInput>
            <FormInput placeholder="Price" type="text" ref={priceRef}>
              <FiDollarSign size={24} />
            </FormInput>

            <FormInput
              placeholder="Store image"
              type="file"
              accept="image/png image/jpeg"
              ref={imageRef}
            >
              <FiImage size={24} />
            </FormInput>
          </InputContainer>

          <RectButton type="submit">
            <p>Create product</p>
          </RectButton>
        </SignUpForm>
      </Content>
    </Container>
  );
};

export default CreateStoreProduct;

export const getServerSideProps: GetServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
