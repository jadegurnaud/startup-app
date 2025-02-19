import React, { useEffect, useState } from "react";
import { Button, Container } from "../atoms";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NewGuidePageStay, NewGuidePageCouverture, NewGuidePageNav, NewGuidePageTransport } from "../templates";
import { Category, Guide } from "../../store/reducers";

const NewTravel = () => {
    const { guide } = useSelector((state) => state.newGuide);
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

    const createTravel = () => {
        const updatedGuide = { ...guide, status: "draft", user: user.id };
        console.log("updatedGuide");
        console.log(updatedGuide);
        if (updatedGuide.guideType === "direct") {
            dispatch(Guide.createGuideDirect(updatedGuide))
                .then(() => {
                    navigate("/planMyTravel");
                    alert("Le voyage a bien été créé.");
                })
                .catch(() => {
                    alert("Il y a eu un problème lors de la création du voyage.");
                });
        } else {
            console.log(updatedGuide);
            dispatch(Guide.createGuideItinerary(updatedGuide))
                .then(() => {
                    navigate("/planMyTravel");
                    alert("Le voyage a bien été créé.");
                })
                .catch(() => {
                    alert("Il y a eu un problème lors de la création du voyage.");
                });
        }
    };

 

    return (
        <Container.Page className="NewGuide">
            <Button.MainButton onClick={createTravel} backgroundColor="#3E5544" hoverBackgroundColor="#56735D" color="white">
                Enregistrer
            </Button.MainButton>

            <Container.RowContainer alignItems="flex-start" height="100%">
                <NewGuidePageNav guide={guide} onPageClick={handlePageClick} />
                {selectedPage === "couverture" && <NewGuidePageCouverture categories={categories} guide={guide} />}
                {selectedPage.startsWith("stay-") && <NewGuidePageStay guide={guide} selectedStayIndex={selectedStayIndex} />}
                {selectedPage.startsWith("transport-") && <NewGuidePageTransport guide={guide} selectedTransportIndex={selectedTransportIndex} />}
            </Container.RowContainer>
        </Container.Page>
    );
};

export default NewTravel;