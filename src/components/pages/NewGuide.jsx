import React, { useState } from "react";
import { Text, Container, Input, Button, Image } from "../atoms";
import { DOM } from "../nanites";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsGuideDirect } from "../../store/slices/newGuideSlice";
import { NewGuideDirect, NewGuideItineraire } from "../templates";


const NewGuide = () => {
    
    const { newGuide, isGuideDirect } = useSelector((state) => state.newGuide);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGuideDirect = () => {
        dispatch(setIsGuideDirect(true));
    }

    const handleGuideItineraire = () => {
        dispatch(setIsGuideDirect(false));
    }
    

    return (
        <Container.Page className="NewGuide">
           <DOM.StyledContainer>
            <Text.Paragraph onClick={handleGuideDirect}>Direct</Text.Paragraph>
            <Text.Paragraph onClick={handleGuideItineraire}>Jour par jour</Text.Paragraph>
           </DOM.StyledContainer>
              <DOM.StyledContainer>
                {isGuideDirect ? (
                 <NewGuideDirect />
                ) : (
                 <NewGuideItineraire />
                )}
                </DOM.StyledContainer>
           
        </Container.Page>
    )
}

export default NewGuide;