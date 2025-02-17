import { styled } from "styled-components";

const StyledParagraph = styled.span.withConfig({
    shouldForwardProp: (prop) => !['borderRadius', 'textAlign', 'hoverBackgroundColor', 'backgroundColor', 'fontSize', 'color'].includes(prop),
})`
    background-color: ${(props) => props.backgroundColor ?? "transparent"};
    color: ${(props) => props.color ?? props.theme.colors.colors.primary};
    font-size: ${(props) => props.fontSize ?? "12px"};
    font-style: ${(props) => props.fontStyle ?? "normal"};
    font-weight: ${(props) => props.fontWeight ?? "600"};
    line-height: ${(props) => props.lineHeight ?? "24px"};
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