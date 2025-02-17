import React, { useEffect, useState } from "react";
import { DOM } from "../nanites";
import { Text, Container, Input } from "../atoms";
import { ContentBlocks } from "../organisms";
import { useDispatch } from "react-redux";
import { ReactComponent as PlusBlack } from "../../assets/PlusBlack.svg";
import { ReactComponent as Minus } from "../../assets/Minus.svg";
import { ReactComponent as MaterialSymbolsActivity } from "../../assets/material-symbols_local-activity.svg";
import { ReactComponent as MaterialSymbolsHotel } from "../../assets/material-symbols_hotel.svg";
import { ReactComponent as MaterialSymbolsRestaurant } from "../../assets/material-symbols_restaurant.svg";
import { ReactComponent as PlusActivity } from "../../assets/VectorActivity.svg";
import { ReactComponent as PlusHotel } from "../../assets/VectorHotel.svg";
import { ReactComponent as PlusRestaurant } from "../../assets/VectorRestaurant.svg";
import { 
    addDay, 
    removeDay, 
    setDayDescription,
    addSection,
    removeSection,
    updateSection,
    addContentBlock,
    removeContentBlock, 
    updateContentBlock,
    updateStayDates 
} from "../../store/slices/newGuideSlice";

const NewGuidePageStay = ({guide, selectedStayIndex }) => {
    const dispatch = useDispatch();
    const [selectedDay, setSelectedDay] = useState(0);
    
    // Sécurisation de l'accès aux données
    const stays = guide?.stays || [];
    const currentStay = stays[selectedStayIndex] || {
        days: [],
        address: { city: "" }
    };
    const days = currentStay?.days || [];

    useEffect(() => {
        if (days?.length > 0 && selectedDay >= days?.length) {
            setSelectedDay(days?.length - 1);
        }
    }, [days, selectedDay]);

    const calculateDayDate = (dayIndex) => {
        const startDate = new Date(guide.startDate);
        let totalDays = 0;
        for (let i = 0; i < selectedStayIndex; i++) {
            totalDays += stays[i].days.length;
        }
        startDate.setDate(startDate.getDate() + totalDays + dayIndex);
        return startDate.toISOString().split('T')[0];
    };

    const handleUpdateStayDates = () => {
        if (days.length > 0) {
            const startDate = calculateDayDate(0);
            const endDate = calculateDayDate(days.length - 1);
            dispatch(updateStayDates({
                stayIndex: selectedStayIndex,
                startDate,
                endDate
            }));
        }
    };

    const handleIncreaseDays = () => {
        const nextDate = calculateDayDate(days.length);
        console.log(nextDate);
        dispatch(addDay({
            stayIndex: selectedStayIndex,
            date: nextDate
        }));
        
        handleUpdateStayDates();
    };
    
    const handleDecreaseDays = () => {
        if (days.length > 1) {
            const lastDay = days[days.length - 1];
            if (lastDay?.id) {
                dispatch(removeDay({
                    stayIndex: selectedStayIndex,
                    dayId: lastDay.id
                }));
                
                handleUpdateStayDates();
            }
        }
    };

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    const handleDescriptionChange = (e) => {
        const { value } = e.target;
        const currentDay = days[selectedDay];
        if (currentDay?.id) {
            dispatch(setDayDescription({ 
                stayIndex: selectedStayIndex,
                dayId: currentDay.id,
                description: value 
            }));
        }
    };

    const handleAddSection = (sectionType) => {
        const currentDay = days[selectedDay];
        if (currentDay) {
            dispatch(addSection({
                stayIndex: selectedStayIndex,
                section: {
                    sectionType,
                    title: "",
                    description: ""
                }
            }));
        }
    };

    const handleRemoveSection = (sectionId) => {
        const currentDay = days[selectedDay];
        if (currentDay?.id) {
            dispatch(removeSection({
                stayIndex: selectedStayIndex,
                dayId: currentDay.id,
                sectionId
            }));
        }
    };

    const handleUpdateSection = (sectionId, updates) => {
        const currentDay = days[selectedDay];
        if (currentDay?.id) {
            dispatch(updateSection({
                stayIndex: selectedStayIndex,
                dayId: currentDay.id,
                sectionId,
                updates
            }));
        }
    };

    // Si le guide n'a pas de séjours, on affiche un message
    if (stays.length === 0) {
        return (
            <Container.ColumnContainer width="calc(100% - 270px)" gap="40px" padding="40px">
                <Text.Paragraph>Aucun séjour n'est encore créé.</Text.Paragraph>
            </Container.ColumnContainer>
        );
    }

    return (
        <Container.ColumnContainer width="calc(100% - 270px)" gap="40px" padding="40px">
            <Container.ColumnContainer gap="20px">
                <Text.SubTitle fontSize="16px" fontWeight="bold" color="#000000">
                    {currentStay?.address?.city || "Ville non spécifiée"}
                </Text.SubTitle>
                
                <Container.RowContainer gap="10px" alignItems="center">
                    <DOM.StyledContainer 
                        cursor="pointer" 
                        display="flex" 
                        alignItems="center" 
                        padding="5px" 
                        borderRadius="50%" 
                        backgroundColor="#F0EFEB" 
                        width="24px" 
                        height="24px"
                        onClick={handleDecreaseDays}
                    >
                        <Minus />
                    </DOM.StyledContainer>
                    <Text.Paragraph>{days.length} jours</Text.Paragraph>
                    <DOM.StyledContainer 
                        cursor="pointer" 
                        display="flex" 
                        alignItems="center" 
                        padding="5px" 
                        borderRadius="50%" 
                        backgroundColor="#F0EFEB" 
                        width="24px" 
                        height="24px"
                        onClick={handleIncreaseDays}
                    >
                        <PlusBlack />
                    </DOM.StyledContainer>
                </Container.RowContainer>

                {days.length > 0 && (
                    <>
                        <Container.RowContainer gap="10px">
                            {days.map((_, index) => (
                                <Text.Paragraph
                                    key={index}
                                    onClick={() => handleDayClick(index)}
                                    style={{
                                        cursor: "pointer",
                                        borderBottom: selectedDay === index ? "3px solid #3E5544" : "none",
                                        padding: "16px",
                                    }}
                                >
                                    Jour {index + 1}
                                </Text.Paragraph>
                            ))}
                        </Container.RowContainer>

                        <Container.ColumnContainer gap="20px">
                            <Text.SubTitle>Description pour le jour {selectedDay + 1}</Text.SubTitle>
                            <Input.TextArea
                                value={days[selectedDay]?.description || ""}
                                onChange={handleDescriptionChange}
                                placeholder="Écrivez la description ici..."
                            />
                        </Container.ColumnContainer>

                        <Container.ColumnContainer gap="20px">
                            
                            <Container.RowContainer gap="10px">
                                <Container.RowContainer 
                                    onClick={() => handleAddSection('ACTIVITY')}
                                    padding="12px"
                                    backgroundColor="rgba(255, 111, 255, 0.10)"
                                    cursor="pointer"
                                >
                                    <Container.RowContainer width="200px" gap="10px">
                                        <MaterialSymbolsActivity />
                                        <Text.Span color="#FF6FFF">Activités</Text.Span>
                                    </Container.RowContainer><PlusActivity />
                                </Container.RowContainer>
                                <Container.RowContainer 
                                    onClick={() => handleAddSection('FOOD')}
                                    padding="12px"
                                    backgroundColor="rgba(91, 115, 255, 0.10)"
                                    cursor="pointer"
                                >
                                    <Container.RowContainer width="200px" gap="10px">
                                        <MaterialSymbolsRestaurant />
                                        <Text.Span color="#5B73FF">Restauration</Text.Span>
                                    </Container.RowContainer><PlusRestaurant />
                                </Container.RowContainer>
                                <Container.RowContainer 
                                    onClick={() => handleAddSection('ACCOMODATION')}
                                    padding="12px"
                                    backgroundColor="rgba(255, 174, 0, 0.10)"
                                    cursor="pointer"
                                >
                                    <Container.RowContainer width="200px" gap="10px">
                                        <MaterialSymbolsHotel />
                                        <Text.Span color="#FFAE00">Hébergement</Text.Span>
                                    </Container.RowContainer><PlusHotel />
                                </Container.RowContainer>
                               
                            </Container.RowContainer>

                            <Container.ColumnContainer gap="20px">
                                {days[selectedDay]?.sections?.map((section, index) => (
                                    <Container.ColumnContainer 
                                        key={section.id || index} 
                                        gap="10px"
                                        padding="20px"
                                        backgroundColor="#F9F9F9"
                                        borderRadius="8px"
                                    >
                                        <Container.RowContainer justifyContent="space-between" alignItems="center">
                                        <Text.Paragraph>
                                            {section.sectionType === 'ACTIVITY' ? 'Activité' : 
                                            section.sectionType === 'FOOD' ? 'Restauration' : 'Hébergement'} {index + 1}
                                        </Text.Paragraph>
                                            <DOM.StyledContainer 
                                                cursor="pointer"
                                                onClick={() => handleRemoveSection(section.id)}
                                            >
                                                <Minus />
                                            </DOM.StyledContainer>
                                        </Container.RowContainer>

                                        <Input.InputForm
                                            type="text"
                                            value={section.title || ""}
                                            onChange={(e) => handleUpdateSection(section.id, { title: e.target.value })}
                                            placeholder="Titre"
                                        />
                                        <Input.TextArea
                                            value={section.description || ""}
                                            onChange={(e) => handleUpdateSection(section.id, { description: e.target.value })}
                                            placeholder="Description"
                                        />
                                        <ContentBlocks
                                            contentBlocks={section.contentBlocks || []}
                                            onAddBlock={(blockData) => {
                                                dispatch(addContentBlock({
                                                    stayIndex: selectedStayIndex,
                                                    dayId: days[selectedDay].id,
                                                    sectionId: section.id,
                                                    block: blockData
                                                }));
                                            }}
                                            onRemoveBlock={(blockId) => {
                                                dispatch(removeContentBlock({
                                                    stayIndex: selectedStayIndex,
                                                    dayId: days[selectedDay].id,
                                                    sectionId: section.id,
                                                    blockId
                                                }));
                                            }}
                                            onUpdateBlock={(blockId, updates) => {
                                                dispatch(updateContentBlock({
                                                    stayIndex: selectedStayIndex,
                                                    dayId: days[selectedDay].id,
                                                    sectionId: section.id,
                                                    blockId,
                                                    updates
                                                }));
                                            }}
                                        />
                                    </Container.ColumnContainer>
                                ))}
                            </Container.ColumnContainer>
                        </Container.ColumnContainer>
                    </>
                )}
            </Container.ColumnContainer>
        </Container.ColumnContainer>
    );
};

export default NewGuidePageStay;