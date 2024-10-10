import { styled } from "styled-components";

const StyledSubTitle = styled.h2`
    background-color: ${(props) => props.backgroundColor ?? "transparent"};
    font-size: ${(props) => props.fontSize ?? "18px"};
`;

export default StyledSubTitle;