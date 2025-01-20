import { styled } from "styled-components";

const StyledContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => !['backgroundColor', 'position', 'left', 'right', 'top', 'bottom', 'border', 'padding', 'height', 'width'].includes(prop),
    })`
    background-color: ${(props) => props.backgroundColor ? props.backgroundColor : props.theme.colors.containers.primary};
    color: ${(props) => props.theme.colors.colors.primary};
    ${(props) => props.position ? 'position:' + props.position + ';' : ""}
    ${(props) => props.left ? 'left:' + props.left + ';' : ""}
    ${(props) => props.right ? 'right:' + props.right + ';' : ""}
    ${(props) => props.top ? 'top:' + props.top + ';' : ""}
    ${(props) => props.bottom ? 'bottom:' + props.bottom + ';' : ""}
    ${(props) => props.border ? 'border:' + props.border + ';' : ""}
    ${(props) => props.padding ? 'padding:' + props.padding + ';' : ""}
    ${(props) => props.height ? 'height:' + props.height + ';' : ""}
    ${(props) => props.width ? 'width:' + props.width + ';' : ""}

    #infosProfile {
        display: flex;
        margin-top: 20px;
        gap: 10px;
        article {
            display: flex;

            width: 202px;
            flex-direction: column;
            span:first-child {
                color: #8E8E8E;
            }
        } 
    }
`;

export default StyledContainer;
