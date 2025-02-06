import styled from "styled-components";

const StyledInput = styled.input.withConfig({
    shouldForwardProp: (prop) => !['backgroundColor', 'border', 'padding', 'paddingLeft', 'borderRadius', 'fontSize', 'color', 'boxShadow', 'focusBorderColor', 'focusBoxShadow', 'width', 'marginBottom'].includes(prop),
    })`
    background-color: ${(props) => props.backgroundColor ?? "transparent"};
    ${(props) => props.width ? 'width:' + props.width + ';' : ""}
    ${(props) => props.maxWidth ? 'max-width:' + props.maxWidth + ';' : ""}

    ${(props) => props.border ? 'border:' + props.border + ';' : ""}
    ${(props) => props.$padding ? 'padding:' + props.$padding + ';' : ""}
    ${(props) => props.paddingLeft ? 'padding-left:' + props.paddingLeft + ';' : ""}
    ${(props) => props.borderRadius ? 'border-radius:' + props.borderRadius + ';' : ""}
    font-size: ${(props) => props.fontSize ?? "0.75rem"};
    color: ${(props) => props.theme.colors.colors.primary};
    outline: none;
    box-shadow: ${(props) => props.boxShadow ?? "none"};
    ${(props) => props.marginBottom ? 'margin-bottom:' + props.marginBottom + ';' : ""}
    

`;

export default StyledInput;