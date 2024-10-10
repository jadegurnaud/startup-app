import { styled } from "styled-components";

const StyledButton = styled.a`
  background-color: ${(props) => props.backgroundColor ?? "transparent"};
  width: ${(props) => props.width ?? "100%"};
`;

export default StyledButton;