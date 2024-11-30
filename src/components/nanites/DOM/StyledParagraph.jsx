import { styled } from "styled-components";

const StyledParagraph = styled.p.withConfig({
    shouldForwardProp: (prop) => !['backgroundColor', 'textAlign'].includes(prop),
    })`
    background-color: ${(props) => props.backgroundColor ?? "transparent"};
    ${(props) => props.textAlign ? 'text-align:' + props.textAlign + ';' : ""}
`;

export default StyledParagraph;