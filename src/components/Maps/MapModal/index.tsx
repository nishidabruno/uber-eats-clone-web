import { FiX } from 'react-icons/fi';
import { useModal } from '../../../hooks/contexts/ProductModalVisibility';
import { RectButton } from '../../RectButton';
import { PickLocationMap } from '../PickLocationMap';

import {
  Container,
  Background,
  Content,
  CloseButtonContainer,
  ImageContainer,
  ButtonContainer,
} from './styles';

interface CoordinatesData {
  lng: number;
  lat: number;
}

interface MapModalProps {
  handleCoordinatesState: (data: CoordinatesData) => void;
}

export function MapModal({ handleCoordinatesState }: MapModalProps) {
  const { setIsOpen } = useModal();

  function handleCloseProductModal() {
    setIsOpen(prev => !prev);
  }

  return (
    <Container>
      <Background onClick={handleCloseProductModal} />
      <Content>
        <ImageContainer>
          <PickLocationMap handleCoordinatesState={handleCoordinatesState} />
          <CloseButtonContainer onClick={handleCloseProductModal}>
            <FiX size={24} />
          </CloseButtonContainer>
        </ImageContainer>
        <ButtonContainer>
          <RectButton onClick={handleCloseProductModal}>
            Confirm location
          </RectButton>
        </ButtonContainer>
      </Content>
    </Container>
  );
}
