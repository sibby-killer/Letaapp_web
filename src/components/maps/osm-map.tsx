"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import L from 'leaflet'

// Fix for default marker icon missing in React Leaflet
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

interface MapProps {
    center?: [number, number]; // [lat, lng]
    zoom?: number;
    markers?: Array<{
        id: string;
        position: [number, number];
        title?: string;
    }>;
    onLocationSelect?: (lat: number, lng: number) => void;
    className?: string;
}

// MMUST Coordinates (approximate center)
const MMUST_CENTER: [number, number] = [0.2827, 34.7519];

export default function OSMMap({
    center = MMUST_CENTER,
    zoom = 15,
    markers = [],
    onLocationSelect,
    className = "h-[400px] w-full rounded-lg"
}: MapProps) {

    // Custom component to handle map clicks
    function LocationMarker() {
        const map = useMap();

        useEffect(() => {
            if (!onLocationSelect) return;

            map.on('click', (e) => {
                onLocationSelect(e.latlng.lat, e.latlng.lng);
            });

            return () => {
                map.off('click');
            }
        }, [map]);

        return null;
    }

    return (
        <div className={className}>
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={marker.position}
                        icon={defaultIcon}
                    >
                        {marker.title && <Popup>{marker.title}</Popup>}
                    </Marker>
                ))}

                <LocationMarker />
            </MapContainer>
        </div>
    )
}
