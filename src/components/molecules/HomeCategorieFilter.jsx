import React, { useRef, useEffect, useState } from "react";
import { Container, Text, Button } from "../atoms";

export default function HomeCategorieFilter({ categories, onCategorySelect }) {
    const containerRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const scrollLeft = () => {
        if (isMounted && containerRef.current) {
            containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (isMounted && containerRef.current) {
            containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    return (
        <Container.RowContainer display="flex" alignItems="center" padding="12px 20px" width="100%" gap="20px">
            <Button.Base onClick={scrollLeft} backgroundColor="#3E5544" padding="10px" borderRadius="999px" color="#fff" cursor="pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                </svg>
            </Button.Base>
            <Container.RowContainer
                ref={containerRef}
                display="flex"
                padding="12px 20px"
                width="100%"
                gap="20px"
                overflow="hidden"
                whiteSpace="nowrap"
            >
                {categories && categories.map((categorie) =>
                    <Text.HomeCategorieTexte key={categorie.id} onClick={() => onCategorySelect(categorie.id)}>
                        {categorie.name}
                    </Text.HomeCategorieTexte>
                )}
            </Container.RowContainer>
            <Button.Base onClick={scrollRight} backgroundColor="#3E5544" color="#fff" padding="10px" borderRadius="999px" display="flex" alignItems="center" justifyContent="center" cursor="pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                </svg>
            </Button.Base>
        </Container.RowContainer>
    );
}