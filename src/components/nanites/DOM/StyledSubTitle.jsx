import { styled } from "styled-components";

const StyledSubTitle = styled.h2`
    background-color: ${(props) => props.$backgroundColor ?? "transparent"};
    padding-left: ${(props) => props.$paddingLeft ?? "10px"};
`;

export default StyledSubTitle;