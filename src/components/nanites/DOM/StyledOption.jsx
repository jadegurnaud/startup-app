import { styled } from "styled-components";

const StyledOption = styled.option.withConfig({
    shouldForwardProp: (prop) => !['backgroundColor', 'textAlign'].includes(prop),
    })`
    background-color: ${(props) => props.backgroundColor ?? "transparent"};
    ${(props) => props.textAlign ? 'text-align:' + props.textAlign + ';' : ""}
    font-size: ${(props) => props.fontSizes ?? "14px"};
`;

export default StyledOption;