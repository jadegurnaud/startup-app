import React, { useEffect, useState } from 'react';
import {Text, Button, Container, Input} from "../atoms";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGuideData } from "../../store/slices/newGuideSlice";

export default function ModalNewTravel({onNewTravelClick}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isNewTravelDirect, setIsNewTravelDirect] = useState(true);
    const [loading, setLoading] = useState(false);
    const [newTravelData, setNewTravelData] = useState({
      title: "",
      description: "",
      guideType: "direct",
      startCity: "",
      startDate: "",
      endDate: "",
      status: "draft",
      price: null,
      stays: [],
      createdAt: null,
      updatedAt: null,
      views: 0,
      categories: [],
      address: {},
      user: null,
      isTravel: true
    });

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
   
    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            const countryData = data.map(country => ({
                name: country.translations.fra?.common || country.name.common,
                code: country.cca2
            })).sort((a, b) => a.name.localeCompare(b.name));
            setCountries(countryData);
        } catch (error) {
            console.error('Error fetching countries:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCities = async (countryCode) => {
      setLoading(true);
      try {
          const response = await fetch(
              `http://api.geonames.org/searchJSON?country=${countryCode}&featureClass=P&maxRows=50&username=jadegurnaud`
          );
          const data = await response.json();

          if (!data.geonames) throw new Error("Erreur lors du chargement des villes");

          const cities = data.geonames.map(city => ({
              name: city.name,
              latitude: city.lat,
              longitude: city.lng
          })).sort((a, b) => a.name.localeCompare(b.name));

          setCities(cities);
      } catch (error) {
          console.error("Error fetching cities:", error);
          setCities([]);
      } finally {
          setLoading(false);
      }
  };
  
  
  
  
  

    const onDirect = () => {
        setIsNewTravelDirect(true);
        setNewTravelData(prev => ({
          ...prev,
          guideType: "direct",
          startDate: null,
          endDate: null
      }));
    }

    const onItineraire = () => {
        setIsNewTravelDirect(false);
        setNewTravelData(prev => ({
          ...prev,
          guideType: "itinerary"
      }));
    }

    const handleNewTravelClick = () => {
        const initializedTravelData = {
            ...newTravelData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            views: 0
        };

        if (!isNewTravelDirect) {
            initializedTravelData.stays = [{
                order: 1,
                startDate: newTravelData.startDate,
                endDate: newTravelData.endDate,
                description: "",
                address: {
                    city: newTravelData.address.city,
                    country: newTravelData.address.country,
                    longitude: newTravelData.address.longitude,
                    latitude: newTravelData.address.latitude
                },
                days: [{
                    date: newTravelData.startDate,
                    description: "Premier jour",
                    sections: []
                }],
                departingTransports: [],
                arrivingTransports: []
            }];
        }
        dispatch(setGuideData(initializedTravelData));
        onNewTravelClick();
        window.open("/newTravel", "_blank");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "country") {
            const selectedCountry = countries.find(country => country.name === value);
            if (selectedCountry) {
                setNewTravelData({
                    ...newTravelData,
                    address: {
                        ...newTravelData.address,
                        country: value,
                        countryCode: selectedCountry.code
                    },
                });
                fetchCities(selectedCountry.code);
            }
        } else if (name === "city") {
          const selectedCity = cities.find(city => city.name === value);
          if (selectedCity) {
              setNewTravelData({
                  ...newTravelData,
                  startCity: value,
                  address: {
                      ...newTravelData.address,
                      city: value,
                      latitude: selectedCity.latitude,
                      longitude: selectedCity.longitude
                  },
              });
          }
        } else {
            setNewTravelData({
                ...newTravelData,
                [name]: value,
            });
        }
    };

    return (
        <Container.ColumnContainer className="modalNewGuide" gap="40px"
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '534px',
              maxWidth: '90%',
            }}
        >
            <Container.RowContainer justifyContent="space-between">
                <Text.Paragraph style={{ fontSize: "16px", fontWeight: "600"}}>Nouveau voyage</Text.Paragraph>
                <Button.Base onClick={onNewTravelClick}>X</Button.Base>
            </Container.RowContainer>

            <Container.ColumnContainer gap="20px">
                <Text.Paragraph>Choisissez le type de voyage</Text.Paragraph>
                <Container.RowContainer gap="10px">
                    <Button.Base 
                        onClick={onDirect} 
                        padding="10px 14px" 
                        backgroundColor={isNewTravelDirect ? "#3E5544" : "#F0EFEB"}
                        color={isNewTravelDirect ? "#FFF" : "#000"}
                    >
                        Direct
                    </Button.Base>
                    <Button.Base 
                        onClick={onItineraire} 
                        padding="10px 14px" 
                        backgroundColor={!isNewTravelDirect ? "#3E5544" : "#F0EFEB"}
                        color={!isNewTravelDirect ? "#FFF" : "#000"}
                    >
                        En itinéraire
                    </Button.Base>
                </Container.RowContainer>
            </Container.ColumnContainer>

            <Container.ColumnContainer gap="20px">
                <Container.ColumnContainer gap="10px">
                    <Input.Label>Nom de votre voyage</Input.Label>
                    <Input.InputForm type="text" name="title" onChange={handleInputChange}/>
                </Container.ColumnContainer>
                <Container.ColumnContainer gap="10px">
                    <Input.Label>Quel pays allez-vous visiter ?</Input.Label>
                    <select 
                        name="country" 
                        onChange={handleInputChange} 
                        disabled={loading}
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="">Sélectionnez un pays</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country.name}>{country.name}</option>
                        ))}
                    </select>
                </Container.ColumnContainer>
                <Container.ColumnContainer gap="10px">
                    <Input.Label>Quel est votre ville de départ ?</Input.Label>
                    <select 
                        name="city" 
                        onChange={handleInputChange} 
                        disabled={!newTravelData.address.country || loading}
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="">Sélectionnez une ville</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city.name}>{city.name}</option>
                        ))}
                    </select>
                    {loading && <Text.Paragraph style={{ fontSize: "14px", color: "#666" }}>Chargement des villes...</Text.Paragraph>}
                </Container.ColumnContainer>

                {!isNewTravelDirect && (
                    <Container.RowContainer gap="10px">
                        <Container.ColumnContainer gap="10px" width="50%">
                            <Input.Label>Date de départ</Input.Label>
                            <Input.InputForm type="date" name="startDate" onChange={handleInputChange}/>
                        </Container.ColumnContainer>
                        <Container.ColumnContainer gap="10px" width="50%">
                            <Input.Label>Date de fin</Input.Label>
                            <Input.InputForm type="date" name="endDate" onChange={handleInputChange}/>
                        </Container.ColumnContainer>
                    </Container.RowContainer>
                )}
            </Container.ColumnContainer>

            <Container.RowContainer justifyContent="center" gap="10px">
                <Button.Base onClick={onNewTravelClick} padding="10px 14px" backgroundColor="#F0EFEB">
                    Annuler
                </Button.Base>
                <Button.Base 
                    onClick={handleNewTravelClick} 
                    padding="10px 14px" 
                    color="#FFF" 
                    backgroundColor="#3E5544"
                    disabled={!newTravelData.title || !newTravelData.address.city}
                >
                    Commencer à planifier
                </Button.Base>
            </Container.RowContainer>
        </Container.ColumnContainer>
    );
}