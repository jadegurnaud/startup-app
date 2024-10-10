import { styled } from "styled-components";

const StyledParagraph = styled.p`
    background-color: ${(props) => props.backgroundColor ?? "transparent"};
    font-size: ${(props) => props.fontSize ?? "12px"}; 
`;

export default StyledParagraph;