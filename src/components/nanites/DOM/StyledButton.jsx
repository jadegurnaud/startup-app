import { styled } from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => props.$backgroundColor ?? "transparent"};
  width: ${(props) => props.$width ?? "10rem"};
`;

export default StyledButton;