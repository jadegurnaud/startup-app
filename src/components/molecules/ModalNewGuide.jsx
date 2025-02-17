import React, { useEffect, useState } from 'react';
import {Text, Button, Container, Input} from "../atoms";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGuideData } from "../../store/slices/newGuideSlice";

export default function ModalNewGuide({onNewGuideClick}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isNewGuideDirect, setIsNewGuideDirect] = useState(true);
    const [loading, setLoading] = useState(false);
    const [newGuideData, setNewGuideData] = useState({
      title: "",
      description: "",
      guideType: "DIRECT",
      startCity: "",
      startDate: "",
      endDate: "",
      status: "DRAFT",
      price: null,
      stays: [],
      createdAt: null,
      updatedAt: null,
      views: 0,
      categories: [],
      address: {},
      user: null
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
        setIsNewGuideDirect(true);
        setNewGuideData(prev => ({
          ...prev,
          guideType: "DIRECT",
          startDate: null,
          endDate: null
      }));
    }

    const onItineraire = () => {
        setIsNewGuideDirect(false);
        setNewGuideData(prev => ({
          ...prev,
          guideType: "ITINERARY"
      }));
    }

    const handleNewGuideClick = () => {
        const initializedGuideData = {
            ...newGuideData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            views: 0
        };

        if (!isNewGuideDirect) {
            initializedGuideData.stays = [{
                order: 1,
                startDate: newGuideData.startDate,
                endDate: newGuideData.endDate,
                description: "",
                address: {
                    city: newGuideData.address.city,
                    country: newGuideData.address.country,
                    longitude: newGuideData.address.longitude,
                    latitude: newGuideData.address.latitude
                },
                days: [{
                    date: newGuideData.startDate,
                    description: "Premier jour",
                    sections: []
                }],
                departingTransports: [],
                arrivingTransports: []
            }];
        }
        dispatch(setGuideData(initializedGuideData));
        onNewGuideClick();
        window.open("/newGuide", "_blank");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "country") {
            const selectedCountry = countries.find(country => country.name === value);
            if (selectedCountry) {
                setNewGuideData({
                    ...newGuideData,
                    address: {
                        ...newGuideData.address,
                        country: value,
                        countryCode: selectedCountry.code
                    },
                });
                fetchCities(selectedCountry.code);
            }
        } else if (name === "city") {
          const selectedCity = cities.find(city => city.name === value);
          if (selectedCity) {
              setNewGuideData({
                  ...newGuideData,
                  startCity: value,
                  address: {
                      ...newGuideData.address,
                      city: value,
                      latitude: selectedCity.latitude,
                      longitude: selectedCity.longitude
                  },
              });
          }
        } else {
            setNewGuideData({
                ...newGuideData,
                [name]: value,
            });
        }
    };

    return (
        <Container.ColumnContainer gap="40px"
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '534px',
              maxWidth: '90%',
            }}
        >
            <Container.RowContainer justifyContent="space-between">
                <Text.Paragraph style={{ fontSize: "16px", fontWeight: "600"}}>Nouveau guide</Text.Paragraph>
                <Button.Base onClick={onNewGuideClick}>X</Button.Base>
            </Container.RowContainer>

            <Container.ColumnContainer gap="20px">
                <Text.Paragraph>Choisissez le type de guide</Text.Paragraph>
                <Container.RowContainer gap="10px">
                    <Button.Base 
                        onClick={onDirect} 
                        padding="10px 14px" 
                        backgroundColor={isNewGuideDirect ? "#3E5544" : "#F0EFEB"}
                        color={isNewGuideDirect ? "#FFF" : "#000"}
                    >
                        Direct
                    </Button.Base>
                    <Button.Base 
                        onClick={onItineraire} 
                        padding="10px 14px" 
                        backgroundColor={!isNewGuideDirect ? "#3E5544" : "#F0EFEB"}
                        color={!isNewGuideDirect ? "#FFF" : "#000"}
                    >
                        En itinéraire
                    </Button.Base>
                </Container.RowContainer>
            </Container.ColumnContainer>

            <Container.ColumnContainer gap="20px">
                <Container.ColumnContainer gap="10px">
                    <Input.Label>Nom de votre guide</Input.Label>
                    <Input.InputForm type="text" name="title" onChange={handleInputChange}/>
                </Container.ColumnContainer>
                <Container.ColumnContainer gap="10px">
                    <Input.Label>Quel pays avez-vous visité ?</Input.Label>
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
                        disabled={!newGuideData.address.country || loading}
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="">Sélectionnez une ville</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city.name}>{city.name}</option>
                        ))}
                    </select>
                    {loading && <Text.Paragraph style={{ fontSize: "14px", color: "#666" }}>Chargement des villes...</Text.Paragraph>}
                </Container.ColumnContainer>

                {!isNewGuideDirect && (
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
                <Button.Base onClick={onNewGuideClick} padding="10px 14px" backgroundColor="#F0EFEB">
                    Annuler
                </Button.Base>
                <Button.Base 
                    onClick={handleNewGuideClick} 
                    padding="10px 14px" 
                    color="#FFF" 
                    backgroundColor="#3E5544"
                    disabled={!newGuideData.title || !newGuideData.address.city}
                >
                    Commencer mon guide
                </Button.Base>
            </Container.RowContainer>
        </Container.ColumnContainer>
    );
}