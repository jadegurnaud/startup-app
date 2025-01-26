import { styled } from "styled-components";

const StyledContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => !['backgroundColor', 'borderBottom', 'borderRadius', 'flexDirection', 'justifyContent', 'alignItems', 'position', 'left', 'right', 'top', 'bottom', 'border', 'padding', 'height', 'width'].includes(prop),
})`
    color: ${(props) => props.color ?? props.theme.colors.colors.primary};
    ${(props) => props.position ? 'position:' + props.position + ';' : ""}
    ${(props) => props.left ? 'left:' + props.left + ';' : ""}
    ${(props) => props.right ? 'right:' + props.right + ';' : ""}
    ${(props) => props.top ? 'top:' + props.top + ';' : ""}
    ${(props) => props.bottom ? 'bottom:' + props.bottom + ';' : ""}
    ${(props) => props.border ? 'border:' + props.border + ';' : ""}
    ${(props) => props.padding ? 'padding:' + props.padding + ';' : ""}
    ${(props) => props.height ? 'height:' + props.height + ';' : ""}
    ${(props) => props.width ? 'width:' + props.width + ';' : ""}
    ${(props) => props.display ? 'display:' + props.display + ';' : ""}
    ${(props) => props.alignItems ? 'align-items:' + props.alignItems + ';' : ""}
    ${(props) => props.margin ? 'margin:' + props.margin + ';' : ""}
    ${(props) => props.flexDirection ? 'flex-direction:' + props.flexDirection + ';' : ""}
    ${(props) => props.justifyContent ? 'justify-content:' + props.justifyContent + ';' : ""}
    ${(props) => props.gap ? 'gap:' + props.gap + ';' : ""}
    ${(props) => props.backgroundColor ? 'background-color:' + props.backgroundColor + ';' : ""}
    ${(props) => props.borderBottom ? 'border-bottom:' + props.borderBottom + ';' : ""}
    ${(props) => props.background ? 'background:' + props.background + ';' : ""}
    ${(props) => props.borderRadius ? 'border-radius:' + props.borderRadius + ';' : ""}
    ${(props) => props.cursor ? 'cursor:' + props.cursor + ';' : ""}
    ${(props) => props.overflow ? 'overflow:' + props.overflow + ';' : ""}
    ${(props) => props.boxShadow ? 'box-shadow:' + props.boxShadow + ';' : ""}
    ${(props) => props.zIndex ? 'z-index:' + props.zIndex + ';' : ""}
    ${(props) => props.backdropFilter ? 'backdrop-filter:' + props.backdropFilter + ';' : ""}
&:hover {
    ${(props) => props.hoverBackgroundColor ? 'background-color:' + props.hoverBackgroundColor + ';' : ""}
    }
`;

export default StyledContainer;
