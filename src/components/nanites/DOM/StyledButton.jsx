import { styled } from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => props.$backgroundColor ?? "transparent"};
  padding: ${(props) => props.$padding ?? "5px 30px"};
  border: ${(props) => props.$border ?? "1px solid " + props.theme.colors.colors.primary};
  color: ${(props) => props.theme.colors.colors.primary};
  border-radius: 5px;
  cursor: pointer;
`;

export default StyledButton;