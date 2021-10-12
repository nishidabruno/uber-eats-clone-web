import { useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { StoreInfoPopup } from '../StoreInfoPopup';

import { Container } from './styles';
import { useWindowDimension } from '../../../hooks/contexts/WindowDimensionContext';

mapboxgl.accessToken = String(process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);

interface PickupContainerProps {
  storesData: {
    id: string;
    name: string;
    delivery_fee: string;
    delivery_time: string;
    image: string;
    coordinates_id: {
      latitude: string;
      longitude: string;
    };
  }[];
}

export function PickupMap({ storesData }: PickupContainerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const router = useRouter();
  const { windowDimension } = useWindowDimension();

  const handleRedirectToStore = useCallback(
    (storeId: string) => {
      router.push(`/store/${storeId}`);
    },
    [router]
  );

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: String(process.env.NEXT_PUBLIC_MAPBOX_MAP_STYLES),
      center: [139.860436, 35.652278],
      zoom: 14,
    });

    storesData.forEach(store => {
      if (!map.current) return;
      const container = document.createElement('div');
      ReactDOM.render(
        <StoreInfoPopup
          storeData={store}
          onClick={() => handleRedirectToStore(store.id)}
        />,
        container
      );
      const popup = new mapboxgl.Popup({
        maxWidth: windowDimension < 768 ? '200px' : '320px',
        closeButton: false,
        offset: 55,
      }).setDOMContent(container);

      new mapboxgl.Marker({
        color: '#000',
        draggable: false,
      })
        .setLngLat([
          Number(store.coordinates_id.longitude),
          Number(store.coordinates_id.latitude),
        ])
        .setPopup(popup)
        .addTo(map.current);
    });
  }, [storesData, handleRedirectToStore, windowDimension]);

  return <Container ref={mapContainer} />;
}
