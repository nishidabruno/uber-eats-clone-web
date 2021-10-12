/* eslint-disable import/no-unresolved */
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';

import {
  Container,
  BackButton,
  BannersContainer,
  Banner,
  NextButton,
} from './styles';
import { useWindowDimension } from '../../hooks/contexts/WindowDimensionContext';

interface PromotionSliderProps {
  data: {
    image: string;
  }[];
}

SwiperCore.use([Navigation]);

export function PromotionSlider({ data }: PromotionSliderProps) {
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  const { windowDimension } = useWindowDimension();

  function handleSliderPerView(): number {
    if (windowDimension > 1024) {
      return 3;
    }
    if (windowDimension <= 1024 && windowDimension > 768) {
      return 2;
    }

    return 1;
  }

  return (
    <Container>
      <BackButton ref={prevButtonRef}>
        <FiArrowLeft size={24} />
      </BackButton>

      <Swiper
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onInit={(swiper: any) => {
          setTimeout(() => {
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.nextEl = nextButtonRef.current;
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.prevEl = prevButtonRef.current;

            swiper.navigation.init();
            swiper.navigation.update();
          });
        }}
        slidesPerView={handleSliderPerView()}
        spaceBetween={0}
        slidesPerGroup={handleSliderPerView()}
        loop
        loopFillGroupWithBlank
      >
        <BannersContainer>
          {data.map((item, index) => (
            <SwiperSlide key={String(index)}>
              <Banner>
                <Image
                  src={item.image}
                  width={575}
                  height={244}
                  layout="responsive"
                  // objectFit="contain"
                />
              </Banner>
            </SwiperSlide>
          ))}
        </BannersContainer>
      </Swiper>

      <NextButton ref={nextButtonRef}>
        <FiArrowRight size={24} />
      </NextButton>
    </Container>
  );
}
