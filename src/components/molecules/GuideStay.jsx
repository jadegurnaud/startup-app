import React, { useState, useEffect } from "react";
import { Container, Text } from "../atoms";
import { format, differenceInDays } from "date-fns";


export default function GuideStay({stay}) {
    const [selectedDay, setSelectedDay] = useState(null);

    const formatDate = (date) => {
        return format(new Date(date), "dd/MM/yyyy");
    }

    const calculateDays = (startDate, endDate) => {
        return differenceInDays(new Date(endDate), new Date(startDate)) + 1; // +1 to include both start and end date
    };

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    const getSectionColor = (sectionType) => {
        switch (sectionType) {
          case 'ACTIVITY':
            return '4px solid rgba(255, 111, 255, 0.10)';
          case 'FOOD':
            return '4px solid rgba(91, 115, 255, 0.10)';
          case 'TRANSPORT':
            return '#E8F5E9';
            case 'ACCOMODATION':
            return '4px solid rgba(255, 174, 0, 0.10)';
          default:
            return '#F5F5F5';
        }
      };

    useEffect(() => {
        setSelectedDay(stay?.days?.[0]);
    }, [stay]);

    return (
            <Container.ColumnContainer 
        backgroundColor= 'white' padding="20px" width="100%" gap="20px"  borderRadius="12px">
            {stay && (
                <Container.ColumnContainer gap="40px">
                    <Container.ColumnContainer gap="20px">
                        <Text.SubTitle>{ stay.address.city }</Text.SubTitle>
                        <Text.Span>{calculateDays(stay.startDate, stay.endDate)} jours</Text.Span>
                        <Text.Span>Du { formatDate(stay.startDate) } au { formatDate(stay.endDate) }</Text.Span>
                    </Container.ColumnContainer>
                    <Container.RowContainer gap="20px"  alignItems="top">
                        { stay.days && stay.days.map((day, index) => (
                            <Container.ColumnContainer key={day.id} gap="10px">
                                    <Text.SubTitle style={{
                  cursor: 'pointer', 
                  fontSize: '12px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: 'normal',
                  padding: '16px',
                  color: selectedDay?.id === day.id ? '#3E5544' : '#000',
                  borderBottom: selectedDay?.id === day.id ? '2px solid #3E5544' : 'none'
                }} onClick={() => handleDayClick(day)}>Jour {index+1}</Text.SubTitle>  
                                    <Text.Paragraph>{formatDate(day.date)}</Text.Paragraph>
                                </Container.ColumnContainer>
                                
                        ))}
                    </Container.RowContainer>
                    {selectedDay && (
                        <Container.ColumnContainer key={selectedDay.id} gap="20px">
                            <Text.Span>{selectedDay.description}</Text.Span>

                            {selectedDay.sections && selectedDay.sections.map((section) => (
                                <Container.ColumnContainer key={section.id} gap="10px" border={getSectionColor(section.sectionType)} padding="20px" borderRadius="12px">
                                    <Text.Paragraph>{section.sectionType}</Text.Paragraph>
                                    <Text.Span>{section.title}</Text.Span>
                                    <Text.Paragraph>{section.description}</Text.Paragraph>
                                </Container.ColumnContainer>
                            ))}
                        </Container.ColumnContainer>
                    )}
                </Container.ColumnContainer>
               
            )}

       
        </Container.ColumnContainer>
        
    );
}