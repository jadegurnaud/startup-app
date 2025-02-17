import React, { useEffect, useState } from "react";
import { Button, Container } from "../atoms";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NewGuidePageStay, NewGuidePageCouverture, NewGuidePageNav, NewGuidePageTransport } from "../templates";
import { Category, Guide } from "../../store/reducers";


const NewGuide = () => {
    
    const { guide, isGuideDirect } = useSelector((state) => state.newGuide);
    const { categories } = useSelector((state) => state?.categories);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedPage, setSelectedPage] = useState("couverture");
    const [selectedStayIndex, setSelectedStayIndex] = useState(0);
    const [selectedTransportIndex, setSelectedTransportIndex] = useState(0);
    
    useEffect(() => {
        console.log(guide);
        dispatch(Category.getCategories());
        
    }, [dispatch]);

    const handlePageClick = (page) => {
        setSelectedPage(page);
        if (page.startsWith("stay-")) {
            const index = parseInt(page.split("-")[1], 10);
            setSelectedStayIndex(index);
        } else if (page.startsWith("transport-")) {
            const index = parseInt(page.split("-")[1], 10);
            setSelectedTransportIndex(index);
        }
    };
    const createGuideDraft = () => {
        const updatedGuide = { ...guide, status: "DRAFT", user: user.id };
        if (updatedGuide.guideType === "DIRECT") {
            dispatch(Guide.createGuideDirect(updatedGuide));
        } else {
            dispatch(Guide.createGuideItinerary(updatedGuide));
        }

    };

    const createGuidePublished = () => {
        const updatedGuide = { ...guide, status: "PUBLISHED", user: user.id };
        if (updatedGuide.guideType === "DIRECT") {
            dispatch(Guide.createGuideDirect(updatedGuide));
        } else {
            dispatch(Guide.createGuideItinerary(updatedGuide));
        }
    };

    return (
        <Container.Page className="NewGuide">
            <Button.MainButton onClick={createGuideDraft} backgroundColor="#3E5544" hoverBackgroundColor="#56735D" color="white">Enregistrer</Button.MainButton>
            <Button.MainButton onClick={createGuidePublished} backgroundColor="#3E5544" hoverBackgroundColor="#56735D" color="white">Publier</Button.MainButton>

           <Container.RowContainer alignItems="flex-start" height="100%">
                <NewGuidePageNav guide={guide} onPageClick={handlePageClick}/>
                {selectedPage === "couverture" && <NewGuidePageCouverture categories={categories} guide={guide}/>}
                {selectedPage.startsWith("stay-") && <NewGuidePageStay guide={guide} selectedStayIndex={selectedStayIndex}/>}
                {selectedPage.startsWith("transport-") && <NewGuidePageTransport guide={guide} selectedTransportIndex={selectedTransportIndex}/>}
           
            </Container.RowContainer>
           
        </Container.Page>
    )
}

export default NewGuide;