import { styled } from "styled-components";

const StyledParagraph = styled.span.withConfig({
    shouldForwardProp: (prop) => !['backgroundColor', 'fontSize', 'color'].includes(prop),
})`
    background-color: ${(props) => props.backgroundColor ?? "transparent"};
    color: ${(props) => props.color ?? props.theme.colors.colors.primary};
    font-size: ${(props) => props.fontSize ?? "1rem"};
    font-weight: ${(props) => props.fontWeight ?? ""};
    margin: ${(props) => props.margin ?? ""};
`;

export default StyledParagraph;