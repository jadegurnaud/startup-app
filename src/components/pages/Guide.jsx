import React, { useEffect, useState } from "react";
import { Text, Image, Container } from "../atoms";
import { useParams } from "react-router-dom";

const Guide = () => {
    const { id } = useParams();
    const [guide, setGuide] = useState(null);

    useEffect(() => {
        const fetchGuide = async () => {
            try {
                const response = await fetch(`http://localhost:3001/guides/${id}`);
                const data = await response.json();
                setGuide(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchGuide();
    }, [id]);

    if (!guide) {
        return (
            <Container.App className="Guide">
                <Text.Title>Loading...</Text.Title>
            </Container.App>
        );
    }

    return (
        <Container.App>
            <Text.Title>{ guide.title }</Text.Title>
            <Image.Base src={guide.coverImage} $width="100%"/>
            <Text.Paragraph>{ guide.description }</Text.Paragraph>
            <Text.Paragraph>Créé par : { guide.user.firstName } { guide.user.lastName }</Text.Paragraph>
        </Container.App>
    );
};

export default Guide;