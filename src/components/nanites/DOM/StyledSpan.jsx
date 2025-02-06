import { styled } from "styled-components";

const StyledParagraph = styled.span.withConfig({
    shouldForwardProp: (prop) => !['borderRadius', 'textAlign', 'hoverBackgroundColor', 'backgroundColor', 'fontSize', 'color'].includes(prop),
})`
    background-color: ${(props) => props.backgroundColor ?? "transparent"};
    color: ${(props) => props.color ?? props.theme.colors.colors.primary};
    font-size: ${(props) => props.fontSize ?? "1rem"};
    font-weight: ${(props) => props.fontWeight ?? ""};
    margin: ${(props) => props.margin ?? ""};
    padding: ${(props) => props.padding ?? ""};
    width: ${(props) => props.width ?? ""};
    text-align: ${(props) => props.textAlign ?? ""};
    cursor: ${(props) => props.cursor ?? ""};
    border-radius: ${(props) => props.borderRadius ?? ""};
    &:hover { 
    background-color: ${(props) => props.hoverBackgroundColor ?? ""}; }

`;

export default StyledParagraph;