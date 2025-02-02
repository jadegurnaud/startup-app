import React, { useEffect, useState } from "react";
import { Text, Image, Container, Button } from "../atoms";
import { useSelector, useDispatch } from "react-redux";
import { Guide as GuideReducers } from "../../store/reducers";
import { useParams, useNavigate } from "react-router-dom";
import { DOM } from "../nanites";
import { useNetwork } from "../../providers/contexts";
import Reactotron from "reactotron-react-js";
import { BandeauGuide } from "../molecules";

const Guide = () => {
    const { guide } = useSelector((state) => state.guide);
    const { user, login } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { isOnline } = useNetwork();
    const [ hasIncremented, setHasIncremented ] = useState(false);

    const handleDeleteGuide = () => {
        dispatch(GuideReducers.deleteGuide(id)).then((result) => {
            if (GuideReducers.deleteGuide.fulfilled.match(result)) {
                navigate("/accueil");
            }
        });
    }

    useEffect(() => {
        dispatch(GuideReducers.getGuide(id));
        console.log("Getting guide");
        if (!hasIncremented) {
            console.log("Incrementing consultations");
            dispatch(GuideReducers.incrementConsultations(id));
            setHasIncremented(true);
        }
    }, [id, dispatch, hasIncremented]);

    const srcCoverImage = isOnline && guide?.coverImage ? guide.coverImage : "/coverImage.png";
      
    return (
        Reactotron.log(isOnline, "Online"),
        <Container.Page className="Guide">  
            <BandeauGuide srcCoverImage={srcCoverImage} guideTitle={ guide.title } guideCountry={ guide.address.country} />
            <DOM.StyledContainer style={{ display: 'flex', gap: '10px', marginTop: '10px', padding: '12px', alignItems: 'center' }}>
                <DOM.StyledContainer overflow="hidden" borderRadius="50%" width="40px" height="40px" backgroundColor="blue" cursor="pointer" onClick={() => navigate("/profil")} >
                        <Image.Base width="100%"
                            src={
                                guide.user?.profileImage
                                    ? guide.user.image
                                    : "/profil.png"
                            }
                            alt="Photo de profil"
                        />
                    </DOM.StyledContainer>
                <Text.Paragraph>{ guide?.user?.firstName } { guide?.user?.lastName }</Text.Paragraph> 
                <Button.Base>Suivre</Button.Base>
            </DOM.StyledContainer>
            <DOM.StyledContainer style={{ display: 'flex', gap: '10px' }}>
            { guide?.categories?.map((category, index) => (
                <Text.Span key={index}>{ category.name }</Text.Span>
            ))}
            </DOM.StyledContainer>
            <Text.Span>{ guide.category }</Text.Span>
            <DOM.StyledContainer style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '10px' }}>
                <DOM.StyledContainer display= "flex"
                    width= "439px"
                    padding= "20px"
                    flexDirection= "column"
                    alignItems= "flex-start"
                    >
                        <Text.SubTitle>Description</Text.SubTitle>
                        <Text.Paragraph>{ guide.description }</Text.Paragraph>
                </DOM.StyledContainer>
                <DOM.StyledContainer display= "flex"
                    width= "439px"
                    padding= "20px"
                    flexDirection= "column"
                    alignItems= "flex-start"
                    gap= "20px" borderRadius= "12px"
                        border= "1px solid #E5E5E5">
                    <Text.Paragraph>Budget Total</Text.Paragraph>
                </DOM.StyledContainer>
            

            </DOM.StyledContainer>

            {guide.guideType === "itinerary" && (
                
                <DOM.StyledContainer display= 'flex' gap= '10px' flexDirection= 'column'>
                    <DOM.StyledContainer display= "flex" alignItems= "center" gap= "40px">
                        <Text.SubTitle>Itinéraire</Text.SubTitle>
                        <Text.Span> Du { guide.startDate } au { guide.endDate }</Text.Span>
                    </DOM.StyledContainer>
                    <DOM.StyledContainer display= "flex"
                        width= "100%"
                        height= "300px"
                        padding= "20px"
                        flexDirection= "column"
                        alignItems= "flex-start"
                        backgroundColor= "#F5F5F5"
                        >
                            
                            
                    </DOM.StyledContainer>
                </DOM.StyledContainer>
            )}
            {guide.images?.length > 0 && (
                    <DOM.StyledContainer style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        {guide.images.map((image, index) => (
                            <Image.Base
                                key={index}
                                src={isOnline && image.url ? image.url : "/coverImage.png"}
                                alt="Photo"
                                width="100px"
                                height="100px"
                                objectFit="cover"
                            />
                        ))}
                    </DOM.StyledContainer>
                )}
            {login && user.id === guide?.user?.id && 
                <Button.Base onClick={() => handleDeleteGuide()}>Supprimer</Button.Base>
            }
        </Container.Page>
    );
};

export default Guide;