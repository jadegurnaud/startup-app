import React, { useEffect } from "react";
import { Text, Image, Container } from "../atoms";
import { useSelector, useDispatch } from "react-redux";
import { Guide as GuideReducers } from "../../store/reducers";
import { useParams } from "react-router-dom";

const Guide = () => {
    const { guide } = useSelector((state) => state.guide);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(GuideReducers.getGuide(id));
    }, [id, dispatch]);

    return (
        <Container.Page className="Guide">
            <Text.Title>{ guide.title }</Text.Title>
            <Image.Base src={guide.coverImage} $width="100%"/>
            <Text.Paragraph>{ guide.description }</Text.Paragraph>
            <Text.Paragraph>Créé par : { guide?.user?.firstName } { guide?.user?.lastName }</Text.Paragraph> 
        </Container.Page>
    );
};

export default Guide;