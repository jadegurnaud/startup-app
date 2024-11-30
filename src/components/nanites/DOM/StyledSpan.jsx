import { styled } from "styled-components";

const StyledParagraph = styled.span.withConfig({
    shouldForwardProp: (prop) => !['backgroundColor', 'fontSize', 'color'].includes(prop),
    })`
    background-color: ${(props) => props.backgroundColor ?? "transparent"};
    font-size: ${(props) => props.fontSize ?? "1rem"};
    color: ${(props) => props.color ?? props.theme.colors.colors.primary};
`;

export default StyledParagraph;