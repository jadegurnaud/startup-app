import { styled } from "styled-components";

const StyledContainer = styled.div`
    background-color: ${(props) => props.$backgroundColor ? props.$backgroundColor : props.theme.colors.containers.primary};
    color: ${(props) => props.theme.colors.colors.primary};
    ${(props) => props.$position ? 'position:' + props.$position + ';' : ""}
    ${(props) => props.$left ? 'left:' + props.$left + ';' : ""}
    ${(props) => props.$right ? 'right:' + props.$right + ';' : ""}
    ${(props) => props.$top ? 'top:' + props.$top + ';' : ""}
    ${(props) => props.$bottom ? 'bottom:' + props.$bottom + ';' : ""}
    ${(props) => props.$border ? 'border:' + props.$border + ';' : ""}
    ${(props) => props.$padding ? 'padding:' + props.$padding + ';' : ""}
    ${(props) => props.$height ? 'height:' + props.$height + ';' : ""}
    ${(props) => props.$width ? 'width:' + props.$width + ';' : ""}
`;

export default StyledContainer;
