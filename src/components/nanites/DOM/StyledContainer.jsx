import { styled } from "styled-components";

const StyledContainer = styled.div`
    background-color: ${(props) => props.$backgroundColor ?? "transparent"};
    ${(props) => props.$position ? 'position:' + props.$position + ';' : ""}
    ${(props) => props.$left ? 'left:' + props.$left + ';' : ""}
    ${(props) => props.$top ? 'top:' + props.$top + ';' : ""}
    ${(props) => props.$bottom ? 'bottom:' + props.$bottom + ';' : ""}

    ${(props) => props.$height ? 'height:' + props.$height + ';' : ""}
    ${(props) => props.$width ? 'width:' + props.$width + ';' : ""}
`;

export default StyledContainer;
