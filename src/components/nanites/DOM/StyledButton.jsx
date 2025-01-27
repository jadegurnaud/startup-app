import { styled } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop) && !['backgroundColor', 'width', 'borderRadius', 'height', 'objectFit'].includes(prop),
})`
  background-color: ${(props) => props.backgroundColor ?? "transparent"};
  padding: ${(props) => props.padding ?? ""};
  color: ${(props) => props.color ?? "black"};
  display: ${(props) => props.display ?? "flex"};
  width: ${(props) => props.width ?? ""};
  height: ${(props) => props.height ?? ""};
  justify-content: ${(props) => props.justifyContent ?? "center"};
  align-items: ${(props) => props.alignItems ?? "center"};
  gap: ${(props) => props.gap ?? ""};
  font-weight: ${(props) => props.fontWeight ?? ""};
  font-size: ${(props) => props.fontSize ?? ""};
  border: ${(props) => props.border ?? "none"};
  &:hover {
    background-color: ${(props) => props.hoverBackgroundColor ?? ""};
  };

  border-radius: 4px;
  cursor: pointer;
`;

export default StyledButton;