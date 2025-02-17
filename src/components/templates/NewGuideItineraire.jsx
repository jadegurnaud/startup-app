import React, { useState } from "react";
import { DOM } from "../nanites";
import { Text, Button, Container, Input } from "../atoms";
import NewGuidePageCouverture from "./NewGuidePageCouverture";

const NewGuideItineraire = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isNewGuide, setIsNewGuide] = useState(false);


    const closeModal = () => {
        setIsModalOpen(false);
    };

    const newGuide = () => {
        setIsNewGuide(true);
        setIsModalOpen(false);
    }

    return (
        <DOM.StyledContainer>
            <Text.Paragraph>Itineraire</Text.Paragraph>

            {isNewGuide && (
                <NewGuidePageCouverture />
            )}
            
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
                <Text.Paragraph style={{ fontSize: "16px", fontWeight: "600"}}>Nouveau guide</Text.Paragraph>
                <Button.Base onClick={closeModal}>X</Button.Base>
            </Container.RowContainer>

           <Container.ColumnContainer gap="20px">
            <Container.ColumnContainer gap="10px">
                <Input.Label>Nom de votre guide</Input.Label>
                <Input.InputForm type="text" />
            </Container.ColumnContainer>
            <Container.ColumnContainer gap="10px">
                <Input.Label>Quel pays avez-vous visité ?</Input.Label>
                <Input.InputForm type="text" />
            </Container.ColumnContainer>
            <Container.ColumnContainer gap="10px">
                <Input.Label>Quel est votre ville de départ ?</Input.Label>
                <Input.InputForm type="text" />
            </Container.ColumnContainer>
            <Container.RowContainer gap="10px">
                <Container.ColumnContainer gap="10px" width="50%">
                    <Input.Label>Date de départ</Input.Label>
                    <Input.InputForm type="date"/>
                </Container.ColumnContainer>
                <Container.ColumnContainer gap="10px" width="50%">
                    <Input.Label>Date de fin</Input.Label>
                    <Input.InputForm type="date"/>
                </Container.ColumnContainer>
            </Container.RowContainer>
            
            </Container.ColumnContainer>
            <Container.RowContainer justifyContent="center" gap="10px">
                <Button.Base onClick={closeModal} padding="10px 14px" backgroundColor="#F0EFEB">Annuler</Button.Base>
                <Button.Base onClick={newGuide} padding="10px 14px" color="#FFF" backgroundColor="#3E5544">Commencer mon guide</Button.Base>
            </Container.RowContainer>
           </Container.ColumnContainer>
        </DOM.StyledContainer>
      )}
        </DOM.StyledContainer>
    );
};

export default NewGuideItineraire;