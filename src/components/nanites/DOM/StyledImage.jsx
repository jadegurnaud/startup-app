import { styled } from "styled-components";

const StyledImage = styled.img`
    background-color: ${(props) => props.$backgroundColor ?? "transparent"};
    width: ${(props) => props.$width ?? "20%"}; 
`;

export default StyledImage;