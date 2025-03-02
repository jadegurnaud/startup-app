import React, { useEffect, useState } from "react";
import { Text, Image, Container, Button } from "../atoms";
import { useSelector, useDispatch } from "react-redux";
import { Guide as GuideReducers, User } from "../../store/reducers";
import { useParams, useNavigate } from "react-router-dom";
import { DOM } from "../nanites";
import { useNetwork } from "../../providers/contexts";
import Reactotron from "reactotron-react-js";
import { BandeauGuide, GuideStay, GuideStays } from "../molecules";
import { format } from "date-fns";

const Guide = () => {
    const { favorites } = useSelector((state) => state?.guides);
    const { guide } = useSelector((state) => state.guide);
    const { user, login } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { isOnline } = useNetwork();
    const [ hasIncremented, setHasIncremented ] = useState(false);
    const { isFollowing } = useSelector((state) => state.userFollowing);
    
    const formatDate = (date) => {
        return format(new Date(date), "dd/MM/yyyy");
    }

    const handleDeleteGuide = () => {
        dispatch(GuideReducers.deleteGuide(id)).then((result) => {
            if (GuideReducers.deleteGuide.fulfilled.match(result)) {
                navigate("/accueil");
            }
        });
    }

    useEffect(() => {
        dispatch(GuideReducers.getGuide(id));
        dispatch(User.checkIfFollowing({ userId: user?.id, followerId: guide?.user?.id }));
        
        if (!hasIncremented) {
            dispatch(GuideReducers.incrementConsultations(id));
            setHasIncremented(true);
        }
        console.log(guide);
    }, [id, dispatch, hasIncremented]);

    const [selectedStay, setSelectedStay] = useState(guide?.stays?.[0]);

    useEffect(() => {
        if (guide?.stays?.length > 0) {
            setSelectedStay(guide.stays[0]);
        }
    }, [guide]);

    const srcCoverImage = isOnline && guide?.coverImage ? guide.coverImage : "/coverImage.png";
      

     const handleFollowUser = () => {
            dispatch(User.followUser({ userId: user.id, followerId: guide.user.id }));
        };
    
        const handleUnfollowUser = () => {
            dispatch(User.unfollowUser({ userId: user.id, followerId: guide.user.id }));
        };

        const handleToggleFavorite = (guideId) => {
            if (!login) {
              navigate("/login");
              return;
            }
        
            try {
              dispatch(
                GuideReducers.toggleFavorite({
                  userId: user.id,
                  guideId,
                  isFavorite: favorites[guideId] || false
                })
              );
            } catch (error) {
              console.error("Failed to toggle favorite", error);
            }
        };

       
        const handleStayClick = (stay) => {
            setSelectedStay(stay);
        };

    return (
        Reactotron.log(isOnline, "Online"),
        <Container.Page className="Guide">  
            <BandeauGuide srcCoverImage={srcCoverImage} guideTitle={ guide.title } guideCountry={ guide?.address?.country} />
            <Container.RowContainer style={{ justifyContent: 'space-between', margin: '20px 40px' }}>
                <Container.RowContainer style={{ gap: '10px', padding: '12px', borderRadius: '6px', backgroundColor: '#F6F6F6' }}>
                    <DOM.StyledContainer overflow="hidden" borderRadius="50%" width="40px" height="40px" cursor="pointer" onClick={() => navigate("/profil")} >
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
                    { isFollowing ? (
                                    <Button.Base onClick={() => handleUnfollowUser()}>Ne plus suivre</Button.Base>
                                ) : ( 
                                    <Button.Base onClick={() => handleFollowUser()}>Suivre</Button.Base>
                                )}
                </Container.RowContainer>
                { favorites[guide.id] || false ? (
                    <Button.MainButton onClick={() => handleToggleFavorite(guide.id)} backgroundColor="#3E5544"
                    hoverBackgroundColor="#56735D">Supprimer des favoris</Button.MainButton>
                ) : (
                    <Button.MainButton onClick={() => handleToggleFavorite(guide.id)} backgroundColor="#3E5544"
                hoverBackgroundColor="#56735D">Ajouter aux favoris</Button.MainButton>
                    )}
                
            </Container.RowContainer>
            <Container.RowContainer style={{ justifyContent: 'space-between', gap: '40px', margin: '20px 40px' }}>
                <Container.ColumnContainer maxWidth= "500px" gap= "40px">
                         <DOM.StyledContainer style={{ display: 'flex', gap: '10px' }}>
                            { guide?.categories?.map((category, index) => (
                                <Text.Span key={index}>{ category.name }</Text.Span>
                            ))}
                        </DOM.StyledContainer>
                        <Container.ColumnContainer>
                            <Text.SubTitle style={{ marginBottom: '10px'}}>Description</Text.SubTitle>
                            <Text.Paragraph>{ guide.description }</Text.Paragraph>
                        </Container.ColumnContainer>
                </Container.ColumnContainer>
                <Container.ColumnContainer
                    width= "439px"
                    padding= "20px"
                    gap= "20px">
                    <Text.Paragraph>Budget global : {guide.price} €</Text.Paragraph>
                    <Container.ColumnContainer gap= "20px" borderRadius= "12px" padding= "20px"
                        border= "1px solid #E5E5E5">
                            <Text.Paragraph>Informations pratiques : </Text.Paragraph>
                        <Text.Span>Mes infos</Text.Span>
                    </Container.ColumnContainer>
                </Container.ColumnContainer>
            

            </Container.RowContainer>

            {guide.guideType === "itinerary" && (
                <Container.ColumnContainer  backgroundColor= "#F5F5F5" padding= "40px" gap= "40px">
                    <Container.RowContainer>
                        <Text.SubTitle>Itinéraire</Text.SubTitle>
                        <Text.Span> Du { formatDate(guide.startDate) } au { formatDate(guide.endDate) }</Text.Span>
                    </Container.RowContainer>
                    <Container.RowContainer gap= "20px"  alignItems= "top">
                        <GuideStays stays={guide.stays} selectedStayId={selectedStay?.id} onsStaySelect={handleStayClick}/>
                        <GuideStay stay={selectedStay} />
                    </Container.RowContainer>
                </Container.ColumnContainer>
                
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