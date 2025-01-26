import React, { useEffect, useState, useRef } from "react";
import { DOM } from "../nanites";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {GuideCard} from "../molecules";


const ViewMap = ({guides}) => {
    const mapRef = useRef(null);
    const guideCardRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [selectedGuide, setSelectedGuide] = useState(null);

    useEffect(() => {
        if (mapRef.current && !mapInstanceRef.current) {
            mapInstanceRef.current = L.map(mapRef.current).setView([48.8566, 2.3522], 13);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "© OpenStreetMap contributors",
            }).addTo(mapInstanceRef.current);

            guides.forEach((guide) => {
                if (!guide.address) return;
                const marker = L.marker([guide.address.latitude, guide.address.longitude])
                    .addTo(mapInstanceRef.current);

                marker.on('click', () => {
                    setSelectedGuide(guide);
                });
            });
        }

        const handleClickOutside = () => {
           setSelectedGuide(null);
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        
    }, [mapRef, mapInstanceRef, guides, selectedGuide]);
    return (
        <DOM.StyledContainer>
            <DOM.StyledContainer ref={mapRef} style={{ height: '400px', width: '100%' }}>
            {selectedGuide && (
                <DOM.StyledContainer style={{  position: 'absolute', marginTop: '80px', marginLeft: '20px' ,zIndex: 100000000, backgroundColor:'transparent' }}>
                    <GuideCard 
                        guide={selectedGuide} 
                        // You might need to pass additional props like isFavorite, toggleFavorite, etc.
                        // For example:
                        // isFavorite={false}
                        // toggleFavorite={() => {}}
                    />
                </DOM.StyledContainer>
            )}
            </DOM.StyledContainer>
        </DOM.StyledContainer>
    );
};

export default ViewMap;