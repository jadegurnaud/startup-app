import React, { useEffect } from "react";
import { Text, Image, Container, Button } from "../atoms";
import { useSelector, useDispatch } from "react-redux";
import { Guide as GuideReducers } from "../../store/reducers";
import { useParams, useNavigate } from "react-router-dom";

const Guide = () => {
    const { guide } = useSelector((state) => state.guide);
    const { user, login } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

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

    return (
        <Container.Page className="Guide">   
            <Image.Base src={guide?.coverImage
                        ? guide.coverImage
                        : "/coverImage.png"
                      }
                      alt="Photo de couverture" $width="70%"/>
            <Text.Title>{ guide.title }</Text.Title>
            <Text.Paragraph>{ guide.description }</Text.Paragraph>
            <Text.Paragraph>Créé par : { guide?.user?.firstName } { guide?.user?.lastName }</Text.Paragraph> 
            {guide.images.length > 0 && (
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        {guide.images.map((image, index) => (
                            <Image.Base
                                key={index}
                                src={image.url}
                                alt="Photo"
                                $width="100px"
                                $height="100px"
                                $objectFit="cover"
                            />
                        ))}
                    </div>
                )}
            {login && user.id === guide?.user?.id && 
                <Button.Base onClick={() => handleDeleteGuide()}>Supprimer</Button.Base>
            }
        </Container.Page>
    );
};

export default Guide;