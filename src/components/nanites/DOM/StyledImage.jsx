import { styled } from "styled-components";

const StyledImage = styled.img`
    background-color: ${(props) => props.$backgroundColor ?? "transparent"};
    width: ${(props) => props.$width ?? "20%"}; 
    ${(props) => props.$borderRadius ? 'border-radius:' + props.$borderRadius + ';' : ""}
`;

export default StyledImage;