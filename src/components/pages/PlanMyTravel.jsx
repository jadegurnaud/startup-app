import React, { useEffect, useState } from "react";
import { DOM } from "../nanites";
import { Container, Text, Button } from "../atoms";
import { HeaderMyTravels, MyTravelsInProgress, MyTravelsPast, ModalNewTravel } from "../molecules";
import { Travel } from "../../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import './ModalMobile.css'

const PlanMyTravel = () => {
    const { travelsInProgress, travelsPast } = useSelector(state => state?.myTravels);
    const { user } = useSelector((state) => state?.user);
    const dispatch = useDispatch();
    const [ isModalOpen, setIsModalOpen ] = useState(false);

     useEffect(() => {
        dispatch(Travel.getTravelsInProgress(user?.id));
        //dispatch(Travel.getTravelsPast(user?.id));
    }, [dispatch, user?.id]);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <Container.Page>
            <HeaderMyTravels onNewTravelClick={openModal}/>
            {travelsInProgress.length > 0 && 
                <MyTravelsInProgress guides={travelsInProgress}/>
            }
            {travelsPast.length > 0 &&
                <MyTravelsPast guides={travelsPast}/>
            }
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
                                <ModalNewTravel onNewTravelClick={closeModal}/>
                                <Container.ColumnContainer gap="40px"
                                            style={{
                                              backgroundColor: 'white',
                                              padding: '20px',
                                              borderRadius: '8px',
                                              width: '534px',
                                              maxWidth: '90%',
                                              display: 'none'
                                            }}
                                             className="modalMobile"
                                        >
                                            <Container.RowContainer justifyContent="space-between">
                                                <Text.Paragraph style={{ fontSize: "16px", fontWeight: "600"}}>Nouveau voyage</Text.Paragraph>
                                                <Button.Base onClick={closeModal}>X</Button.Base>
                                            </Container.RowContainer>
                                            <Text.Paragraph>Veuillez vous connecter sur un device plus large pour accéder aux fonctionnalités de création</Text.Paragraph>
                                </Container.ColumnContainer>
                            
                            </DOM.StyledContainer>
                        )}
        </Container.Page>

    );
};

export default PlanMyTravel;