import { styled } from "styled-components";

const StyledSubTitle = styled.h2.withConfig({
    shouldForwardProp: (prop) => !['backgroundColor', 'textAlign'].includes(prop),
    })`
    background-color: ${(props) => props.backgroundColor ?? "transparent"};
    ${(props) => props.textAlign ? 'text-align:' + props.textAlign + ';' : ""}
    ${(props) => props.color ? 'color:' + props.color + ';' : ""}
`;

export default StyledSubTitle;