import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Container } from './styles';

mapboxgl.accessToken = String(process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);

interface MarkEvent {
  target: {
    getLngLat: () => {
      lng: number;
      lat: number;
    };
  };
}

interface CoordinatesData {
  lng: number;
  lat: number;
}

interface PickupMapProps {
  handleCoordinatesState: (data: CoordinatesData) => void;
}

export function PickLocationMap({ handleCoordinatesState }: PickupMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: 'mapbox://styles/asthe0/ckt9swin161fy17lpacu1ymer',
      center: [139.860436, 35.652278],
      zoom: 14,
    });

    marker.current = new mapboxgl.Marker({
      color: '#000',
      draggable: true,
    })
      .setLngLat([139.860436, 35.652278])
      .addTo(map.current);

    marker.current?.on('dragend', mark => {
      const markObj = mark as MarkEvent;

      const coordinates = markObj.target.getLngLat();

      handleCoordinatesState(coordinates);
    });
  }, [handleCoordinatesState]);

  return <Container ref={mapContainer} />;
}
