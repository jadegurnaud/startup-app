import { styled } from "styled-components";

const StyledParagraph = styled.p.withConfig({
    shouldForwardProp: (prop) => !['backgroundColor', 'textAlign'].includes(prop),
    })`
    background-color: ${(props) => props.backgroundColor ?? "transparent"};
    color: ${(props) => props.color ?? "#000000"};
    ${(props) => props.textAlign ? 'text-align:' + props.textAlign + ';' : ""}
    font-size: ${(props) => props.fontSize ?? "14px"};
    font-style: ${(props) => props.fontStyle ?? "normal"};
    font-weight: ${(props) => props.fontWeight ?? "600"};
    line-height: ${(props) => props.lineHeight ?? "24px"};
    ${(props) => props.padding ? 'padding:' + props.padding + ';' : ""}
`;

export default StyledParagraph;