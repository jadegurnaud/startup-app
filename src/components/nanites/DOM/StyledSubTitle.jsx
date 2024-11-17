import { styled } from "styled-components";

const StyledSubTitle = styled.h2`
    background-color: ${(props) => props.$backgroundColor ?? "transparent"};
`;

export default StyledSubTitle;