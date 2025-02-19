import React from "react";
import { Container, Text } from "../atoms";
import { DOM } from "../nanites";


export default function GuideStays({stays, selectedStayId, onsStaySelect}) {

    return (
        <Container.ColumnContainer padding= "0px 12px 20px 12px" gap="20px" >
           {stays?.map((stay) => (
                <React.Fragment key={stay.id}>
                    <DOM.StyledContainer key={stay.id} style={{ width:'150px', padding: '10px', borderRadius: '4px', cursor: 'pointer', backgroundColor: selectedStayId === stay.id ? 'white' : 'transparent'}} onClick={() => onsStaySelect(stay)}>
                        <Text.Span>{stay?.address?.city}</Text.Span>
                    </DOM.StyledContainer>
                    {stay.departingTransports?.length > 0 && (
                        <DOM.StyledContainer style={{ marginLeft: '20px', color: '#860EFF' }}>
                            {stay.departingTransports.map((transport) => (
                                 <Container.RowContainer gap="10px" margin="0 0 0 20px">
                                 <DOM.StyledContainer width="2px" height="41px" backgroundColor="#860EFF"></DOM.StyledContainer>
                             
                                <Text.Paragraph color="#860EFF" key={transport.id}>{transport.transportType}</Text.Paragraph>
                            </Container.RowContainer>
                            ))}
                        </DOM.StyledContainer>
                    )}
                    {stay.arrivingTransports?.length > 0 && (
                        <DOM.StyledContainer style={{ marginLeft: '20px', color: '#860EFF' }}>
                        
                            {stay.arrivingTransports.map((transport) => (
                                
                                    <Text.Paragraph color="#860EFF" key={transport.id}>{transport.tansportType}</Text.Paragraph>
                        
                            ))}
                        </DOM.StyledContainer>
                    )}
                </React.Fragment>
            ))}
        </Container.ColumnContainer>
    );
}