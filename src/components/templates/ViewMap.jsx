import React, { useEffect, useState, useRef } from "react";
import { DOM } from "../nanites";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {GuideCard} from "../molecules";
import { useNavigate } from "react-router-dom";


const ViewMap = ({ guides, favorites, handleToggleFavorite}) => {
    const mapRef = useRef(null);
    const guideCardRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [selectedGuide, setSelectedGuide] = useState(null);
    const navigate = useNavigate();

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

        const handleClickOutside = (event) => {
            if (event.target.closest('.guide-card')) return;
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
                <DOM.StyledContainer 
                cursor="pointer"
                className="guide-card" style={{  position: 'absolute', marginTop: '80px', marginLeft: '20px' ,zIndex: 100000000, backgroundColor:'transparent' }} onClick={(e) => e.stopPropagation()}>
                    <GuideCard 
                        guide={selectedGuide}
                        isFavorite={favorites[selectedGuide.id]}
                        toggleFavorite={handleToggleFavorite}
                        onClick={() => navigate(`/guides/${selectedGuide.id}`)}
                    />
                </DOM.StyledContainer>
            )}
            </DOM.StyledContainer>
        </DOM.StyledContainer>
    );
};

export default ViewMap;