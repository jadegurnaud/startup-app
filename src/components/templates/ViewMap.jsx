import React, { useEffect, useRef } from "react";
import { DOM } from "../nanites";
import { Text } from "../atoms";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


const ViewMap = () => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        if (mapRef.current && !mapInstanceRef.current) {
            mapInstanceRef.current = L.map(mapRef.current).setView([48.8566, 2.3522], 13);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "© OpenStreetMap contributors",
            }).addTo(mapInstanceRef.current);

            L.marker([48.8566, 2.3522])
                .addTo(mapInstanceRef.current)
                .bindPopup("Paris")
                .openPopup();
        }

        
    }, [mapRef, mapInstanceRef]);
    return (
        <DOM.StyledContainer>
            <Text.Paragraph>MAP</Text.Paragraph>
            <DOM.StyledContainer ref={mapRef} style={{ height: '400px', width: '90%' }}/>
            
           
        </DOM.StyledContainer>
    );
};

export default ViewMap;