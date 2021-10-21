import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { imagesApi } from '../../services/imagesApi';

import {
  Container,
  Categoryitem,
  ImageContainer,
  TitleContainer,
} from './styles';

interface CategoriesListProps {
  categoriesData: {
    id: string;
    name: string;
    image: string;
  }[];
}

export function CategoriesList({ categoriesData }: CategoriesListProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeId, setActiveId] = useState(0);

  function handleItemHover(index: number) {
    setIsHovered(prev => !prev);

    setActiveId(index);
  }

  return (
    <Container>
      {categoriesData.map((item, index) => (
        <Categoryitem
          key={String(index)}
          onMouseEnter={() => handleItemHover(Number(index))}
          onMouseLeave={() => handleItemHover(Number(index))}
        >
          <Link href={`/category/${item.id}`}>
            <a>
              <ImageContainer
                isHovered={isHovered && activeId === Number(index)}
              >
                <Image
                  src={`${imagesApi.baseURL}/categories/${item.image}`}
                  alt={item.name}
                  width={60}
                  height={60}
                />
              </ImageContainer>
              <TitleContainer>
                <span>{item.name}</span>
              </TitleContainer>
            </a>
          </Link>
        </Categoryitem>
      ))}
    </Container>
  );
}
