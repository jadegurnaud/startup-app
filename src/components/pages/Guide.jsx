import React, { useEffect } from "react";
import { Text, Image, Container, Button } from "../atoms";
import { useSelector, useDispatch } from "react-redux";
import { Guide as GuideReducers } from "../../store/reducers";
import { useParams, useNavigate } from "react-router-dom";
import { DOM } from "../nanites";
import { useNetwork } from "../../providers/contexts";
import Reactotron from "reactotron-react-js";

const Guide = () => {
    const { guide } = useSelector((state) => state.guide);
    const { user, login } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { isOnline } = useNetwork();

    const handleDeleteGuide = () => {
        dispatch(GuideReducers.deleteGuide(id)).then((result) => {
            if (GuideReducers.deleteGuide.fulfilled.match(result)) {
                navigate("/accueil");
            }
        });
    }

    useEffect(() => {
        dispatch(GuideReducers.getGuide(id));
    }, [id, dispatch]);

    const srcCoverImage = isOnline && guide?.coverImage ? guide.coverImage : "/coverImage.png";
      
    return (
        Reactotron.log(isOnline, "Online"),
        <Container.Page className="Guide">   
            <Image.Base src={srcCoverImage}
                      alt="Photo de couverture" width="70%"/>
            <Text.Title>{ guide.title }</Text.Title>
            <Text.Paragraph>{ guide.description }</Text.Paragraph>
            <Text.Paragraph>Créé par : { guide?.user?.firstName } { guide?.user?.lastName }</Text.Paragraph> 
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