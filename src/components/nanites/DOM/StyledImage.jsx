import { styled } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

const StyledImage = styled.img.withConfig({
    shouldForwardProp: (prop) => isPropValid(prop) && !['backgroundColor', 'width', 'borderRadius', 'height', 'objectFit'].includes(prop),
  })`
    background-color: ${(props) => props.backgroundColor ?? "transparent"};
    width: ${(props) => props.width ?? "20%"}; 
    ${(props) => props.borderRadius ? 'border-radius:' + props.borderRadius + ';' : ""}
    ${(props) => props.height ? 'height:' + props.height + ';' : ""}
    ${(props) => props.objectFit ? 'object-fit:' + props.objectFit + ';' : ""}
`;

export default StyledImage;