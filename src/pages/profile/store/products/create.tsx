import Head from 'next/head';
import { FormEvent, useRef, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  FiAlertTriangle,
  FiDollarSign,
  FiFileText,
  FiImage,
  FiShoppingBag,
} from 'react-icons/fi';
import * as yup from 'yup';
import { api } from '../../../../services/apiClient';
import { FormInput } from '../../../../components/Forms/input';
import { RectButton } from '../../../../components/RectButton';
import { withSSRAuth } from '../../../../utils/withSSRAuth';

import {
  Container,
  Content,
  CreateProductForm,
  InputContainer,
} from '../../../../styles/profile/store/products/create.styles';

interface ValidationErrorData {
  name: string | undefined;
  message: string | undefined;
}

const CreateStoreProduct: NextPage = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState<ValidationErrorData[]>([]);

  const productNameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsDisabled(true);
    try {
      const schema = yup.object().shape({
        name: yup.string().required('Field product name is required.'),
        description: yup.string().required('Field description is required.'),
        price: yup
          .number()
          .typeError('Field product name is required.')
          .required(),
        image: yup
          .object()
          .shape({
            name: yup.string().required('Field image is required.'),
          })
          .nullable(),
      });

      const data = {
        name: String(productNameRef.current?.value),
        description: String(descriptionRef.current?.value),
        price: String(priceRef.current?.value),
        image: imageRef.current?.files && imageRef.current.files[0],
      };

      await schema.validate(data, { abortEarly: false });
      if (!data.image) return;

      const params = new FormData();

      params.append('name', data.name);
      params.append('description', data.description);
      params.append('price', data.price);
      params.append('image', data.image);
      setError([]);

      await api.post('/products', params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      router.push('/');
    } catch (err) {
      setIsDisabled(false);
      if (err instanceof yup.ValidationError) {
        const errors = err.inner.map(errElement => {
          return { name: errElement.path, message: errElement.message };
        });

        setError(errors);
      }
    }
  }

  return (
    <Container>
      <Head>
        <title>Uber eats | Profile</title>
      </Head>
      <Content>
        <CreateProductForm onSubmit={handleSubmit}>
          <h2>Create a new store product</h2>
          <p>Fill in all fields to create a new product</p>
          <InputContainer>
            {error.map(err => (
              <span key={err.name}>
                <FiAlertTriangle color="#DA3633" size={14} />
                {err.message}
              </span>
            ))}
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
            <FormInput placeholder="Price" type="number" ref={priceRef}>
              <FiDollarSign size={24} />
            </FormInput>

            <FormInput
              placeholder="Store image"
              type="file"
              accept="image/png, image/jpeg"
              ref={imageRef}
            >
              <FiImage size={24} />
            </FormInput>
          </InputContainer>

          <RectButton type="submit" disabled={isDisabled}>
            <p>{!isDisabled ? 'Create product' : 'Loading...'}</p>
          </RectButton>
        </CreateProductForm>
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
