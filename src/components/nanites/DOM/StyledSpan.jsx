import { styled } from "styled-components";

const StyledParagraph = styled.span`
    background-color: ${(props) => props.$backgroundColor ?? "transparent"};
    font-size: ${(props) => props.$fontSize ?? "0.7rem"};
`;

export default StyledParagraph;