import { styled } from "styled-components";

const StyledParagraph = styled.p`
    background-color: ${(props) => props.$backgroundColor ?? "transparent"};
`;

export default StyledParagraph;