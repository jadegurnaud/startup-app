import styled from "styled-components";

const StyledInput = styled.input.withConfig({
    shouldForwardProp: (prop) => !['backgroundColor', 'border', 'padding', 'borderRadius', 'fontSize', 'color', 'boxShadow', 'focusBorderColor', 'focusBoxShadow', 'width', 'marginBottom'].includes(prop),
    })`
    background-color: ${(props) => props.backgroundColor ?? "transparent"};
    ${(props) => props.width ? 'width:' + props.width + ';' : ""}
    border: ${(props) => props.border ?? "1px solid #ccc"};
    padding: ${(props) => props.$padding ?? "0.6rem"};
    ${(props) => props.paddingLeft ? 'padding-left:' + props.paddingLeft + ';' : ""}
    border-radius: ${(props) => props.borderRadius ?? "0.3rem"};
    font-size: ${(props) => props.fontSize ?? "1rem"};
    color: ${(props) => props.theme.colors.colors.primary};
    outline: none;
    box-shadow: ${(props) => props.boxShadow ?? "none"};
    ${(props) => props.marginBottom ? 'margin-bottom:' + props.marginBottom + ';' : ""}
    &:focus {
        border-color: ${(props) => props.focusBorderColor ?? "#007BFF"};
        box-shadow: ${(props) => props.focusBoxShadow ?? "0 0 0.5rem rgba(0, 123, 255, 0.5)"};
    }

`;

export default StyledInput;