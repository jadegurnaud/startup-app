import React, { useState } from "react";
import { Text, Container, Input, Button, Image } from "../atoms";
import { DOM } from "../nanites";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Guide } from "../../store/reducers";


const NewGuideHome = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNewGuideClick = () => {
        window.open("/newGuide", "_blank");
    };

    const chooseType = (e) => {
        if (e.target.innerText === "Direct") {
            navigate("/newGuide/direct");
        } else {
            navigate("/newGuide/itineraire");
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
    };

    

    return (
        <Container.Page className="NewGuideHome">
            <Button.Base onClick={handleNewGuideClick}>Nouveau</Button.Base>
            {isModalOpen && (
                    <DOM.StyledContainer
                      style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                      }}
                    >
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
                            <Text.Paragraph>Choisissez le type de votre guide</Text.Paragraph>
                            <Button.Base onClick={closeModal}>X</Button.Base>
                        </Container.RowContainer>
            
                        <Container.RowContainer justifyContent="center" gap="10px">
                            <Button.Base onClick={chooseType} padding="10px 14px" backgroundColor="#F0EFEB">Direct</Button.Base>
                            <Button.Base onClick={chooseType} padding="10px 14px" backgroundColor="#F0EFEB">En itinéraire</Button.Base>
                        </Container.RowContainer>
                       </Container.ColumnContainer>
                    </DOM.StyledContainer>
                  )}
            
        </Container.Page>
    )
}

export default NewGuideHome;