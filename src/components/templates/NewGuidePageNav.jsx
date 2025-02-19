import React, { useEffect, useState } from "react";
import { DOM } from "../nanites";
import { Text, Button, Container, Input } from "../atoms";
import { ReactComponent as PlusBlack } from "../../assets/PlusBlack.svg";
import { ReactComponent as PlusTransport } from "../../assets/PlusTransport.svg";
import { ReactComponent as Path } from "../../assets/Path.svg";
import { useDispatch } from "react-redux";
import { addStay, addEndCity } from "../../store/slices/newGuideSlice";

const NewGuidePageNav = ({guide, onPageClick}) => {
    const [selectedButton, setSelectedButton] = useState("couverture");
    const [showPopup, setShowPopup] = useState(false);
    const [newCityName, setNewCityName] = useState("");
    const [cities, setCities] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (guide.address && guide.address.countryCode) {
            fetchCities(guide.address.countryCode);
        }
    }, [guide.address]);

    const fetchCities = async (countryCode) => {
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
        }
    };

    const handleButtonClick = (button) => {
        setSelectedButton(button);
        onPageClick(button);
    };
 
    const handleAddCity = () => {
        setShowPopup(true);
      };
      const calculateDayDate = (dayIndex, stayIndex) => {
        const startDate = new Date(guide.startDate);
        let totalDays = 0;
        for (let i = 0; i < stayIndex; i++) {
          totalDays += guide.stays[i].days.length;
        }
        startDate.setDate(startDate.getDate() + totalDays + dayIndex);
        return startDate.toISOString().split('T')[0];
      };
      const handleSaveCity = () => {
        const selectedCity = cities.find(city => city.name === newCityName);
        if (selectedCity) {
          const newStay = {
            order: guide.stays.length + 1,
            startDate: calculateDayDate(0, guide.stays.length),
            endDate: calculateDayDate(0, guide.stays.length),
            description: "",
            address: {
              city: selectedCity.name,
              country: guide.address.country,
              longitude: selectedCity.longitude,
              latitude: selectedCity.latitude
            },
            days: [
              {
                date: calculateDayDate(0, guide.stays.length),
                description: "Premier jour",
                sections: []
              }
            ],
            departingTransports: [],
            arrivingTransports: []
          };
          dispatch(addStay(newStay));
          dispatch(addEndCity(selectedCity.name));
          setShowPopup(false);
          setNewCityName("");
          handleButtonClick(`stay-${guide.stays.length}`);
        }
      };
    

    return (
        <DOM.StyledContainer backgroundColor="#F6F6F6" width= "270px" height="100%" padding="12px">
            <Container.ColumnContainer gap="20px">
                <Button.Base onClick={() => handleButtonClick("couverture")}
                    style={{
                        backgroundColor: selectedButton === "couverture" ? "white" : "transparent",
                    }} padding="12px" justifyContent="start" width="100%"><Text.Paragraph>Page de couverture</Text.Paragraph></Button.Base>
                <Container.ColumnContainer gap="20px">
                    <Container.RowContainer gap="10px">
                        <Path /><Text.Paragraph>Itinéraire :</Text.Paragraph>
                    </Container.RowContainer>
                    {guide.stays.map((stay, index) => (
                         <React.Fragment key={index}>
                         <Button.Base padding="12px" onClick={() => handleButtonClick(`stay-${index}`)}
                             style={{
                                 backgroundColor: selectedButton === `stay-${index}` ? "white" : "transparent",
                             }} justifyContent="start" width="100%"><Text.Paragraph>{stay.address.city || "Nouvelle ville"}</Text.Paragraph></Button.Base>
                         {index < guide.stays.length - 1 && (
                            <Container.RowContainer gap="10px" margin="0 0 0 20px">
                                <DOM.StyledContainer width="2px" height="41px" backgroundColor="#860EFF"></DOM.StyledContainer>

                                <Button.Base padding="12px"  onClick={() => handleButtonClick(`transport-${index}`)}
                                    style={{
                                        backgroundColor: selectedButton === `transport-${index}` ? "white" : "transparent",
                                    }} justifyContent="start" width="100%" gap="10px"><PlusTransport /><Text.Paragraph color="#860EFF"> Transport</Text.Paragraph></Button.Base>
                            </Container.RowContainer>
                         )}
                     </React.Fragment>
                    ))}
                    <Button.Base padding="12px" onClick={handleAddCity}
                        style={{
                            backgroundColor: selectedButton === "addCity" ? "white" : "transparent",
                        }} justifyContent="start" width="100%" gap="10px"><PlusBlack /><Text.Paragraph> Ajouter une ville</Text.Paragraph></Button.Base>
                </Container.ColumnContainer>


            </Container.ColumnContainer>
            {showPopup && (
                <DOM.StyledContainer style={{ zIndex: 5 }} position="fixed" top="0" left="0" width="100%" height="100%" backgroundColor="rgba(0, 0, 0, 0.5)" display="flex" justifyContent="center" alignItems="center">
                    <Container.ColumnContainer backgroundColor="white" padding="20px" borderRadius="8px" gap="20px">
                        <Text.Paragraph>Entrez le nom de la ville :</Text.Paragraph>
                        <select
                            value={newCityName}
                            onChange={(e) => setNewCityName(e.target.value)}
                            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="">Sélectionnez une ville</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city.name}>{city.name}</option>
                            ))}
                        </select>                        <Container.RowContainer gap="10px">
                            <Button.Base onClick={handleSaveCity} padding="10px 14px" backgroundColor="#3E5544" color="#FFF">Enregistrer</Button.Base>
                            <Button.Base onClick={() => setShowPopup(false)} padding="10px 14px" backgroundColor="#F0EFEB">Annuler</Button.Base>
                        </Container.RowContainer>
                    </Container.ColumnContainer>
                </DOM.StyledContainer>
            )}
        </DOM.StyledContainer>
    );
};

export default NewGuidePageNav;