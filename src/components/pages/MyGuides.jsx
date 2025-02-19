import React, { useEffect, useState } from "react";
import { Container, Text, Button } from "../atoms";
import { HeaderMyGuides, MesBrouillonsMyGuides, MesGuidesPubliesMyGuides, ModalNewGuide } from "../molecules";
import { useSelector, useDispatch } from "react-redux";
import { Guide } from "../../store/reducers";
import { DOM } from "../nanites";

const MyGuides = () => {
    const { guidesPublies, guidesBrouillons } = useSelector((state) => state?.myGuides);
    const { user } = useSelector((state) => state?.user);
    const dispatch = useDispatch();
    const [ isModalOpen, setIsModalOpen ] = useState(false);


    useEffect(() => {
        dispatch(Guide.getGuidesPublies(user?.id));
        dispatch(Guide.getMyGuidesBrouillons(user?.id));
    }, [dispatch]);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }


    return (
        <Container.Page>
            <HeaderMyGuides onNewGuideClick={openModal}/>
            {guidesBrouillons.length > 0 && 
                <MesBrouillonsMyGuides guides={guidesBrouillons}/>
            }
            {guidesPublies.length > 0 &&
                <MesGuidesPubliesMyGuides guides={guidesPublies}/>
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
                    <ModalNewGuide onNewGuideClick={closeModal}/>
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
                                <Text.Paragraph style={{ fontSize: "16px", fontWeight: "600"}}>Nouveau guide</Text.Paragraph>
                                <Button.Base onClick={closeModal}>X</Button.Base>
                            </Container.RowContainer>
                            <Text.Paragraph>Veuillez vous connecter sur un device plus large pour accéder aux fonctionnalités de création</Text.Paragraph>
                </Container.ColumnContainer>
                                                
                </DOM.StyledContainer>
            )}
        </Container.Page>

    );
};

export default MyGuides;