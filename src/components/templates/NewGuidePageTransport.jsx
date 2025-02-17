import React, { useEffect, useState } from "react";
import { Container, Text } from "../atoms";
import { ReactComponent as Vehicule } from "../../assets/fluent_vehicle-subway-clock-20-filled.svg";
import { ReactComponent as Train } from "../../assets/Train.svg";
import { ReactComponent as Bus } from "../../assets/Bus.svg";
import { ReactComponent as Car } from "../../assets/Car.svg";
import { ReactComponent as Plane } from "../../assets/AirplaneTilt.svg";
import { ReactComponent as Bike } from "../../assets/Bicycle.svg";
import { useDispatch } from "react-redux";
import { addTransport } from "../../store/slices/newGuideSlice";



const NewGuidePageTransport = ({guide, selectedTransportIndex}) => {
    const dispatch = useDispatch();
    const fromStay = guide.stays[selectedTransportIndex].address.city;
    const toStay = guide.stays[selectedTransportIndex + 1].address.city;
    const [selectedTransport, setSelectedTransport] = useState(guide.stays[selectedTransportIndex].departingTransports.length > 0 ? guide.stays[selectedTransportIndex].departingTransports[0].transportType : null);

    const handleTransportClick = (transport) => {
        setSelectedTransport(transport);
        const transportDetails = {
            transportType: transport,
            fromStay,
            toStay,
            description: "",
            order: guide.stays[selectedTransportIndex].departingTransports.length + 1
        };
        dispatch(addTransport({ stayIndex: selectedTransportIndex, transport: transportDetails }));

    };

    const transportOptions = [
        { icon: <Train />, label: "Train" },
        { icon: <Bus />, label: "Bus" },
        { icon: <Car />, label: "Voiture" },
        { icon: <Plane />, label: "Avion" },
        { icon: <Bike />, label: "Vélo" },
        { icon: null, label: "Bateau" } // Ajoutez une icône pour le bateau si disponible
    ];
    return (
        <Container.ColumnContainer width="calc(100% - 270px)" gap="40px" padding="40px">
            <Container.RowContainer>
                <Vehicule />
                <Text.Paragraph color="#860EFF">Transport</Text.Paragraph>
            </Container.RowContainer>
            <Text.Paragraph>Transport de {fromStay} à {toStay}</Text.Paragraph>
           <Container.RowContainer gap="20px">
                {transportOptions.map((option, index) => (
                    <Container.RowContainer key={index} cursor="pointer" padding="10px" gap="10px" onClick={() => handleTransportClick(option.label)} style={{
                        backgroundColor: selectedTransport === option.label ? "#D3D3D3" : "transparent",
                        borderRadius: "5px",
                        transition: "background-color 0.3s",
                    }}>
                        {option.icon}
                        <Text.Paragraph>{option.label}</Text.Paragraph>
                    </Container.RowContainer>
                ))}
            </Container.RowContainer>
           
        </Container.ColumnContainer>
    )
}

export default NewGuidePageTransport;