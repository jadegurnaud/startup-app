import { styled } from "styled-components";

const StyledSelect = styled.select.withConfig({
    shouldForwardProp: (prop) => !['backgroundColor', 'textAlign'].includes(prop),
    })`
    background-color: ${(props) => props.backgroundColor ?? "transparent"};
    ${(props) => props.textAlign ? 'text-align:' + props.textAlign + ';' : ""}
    font-size: ${(props) => props.fontSizes ?? "14px"};
    padding: 6px 10px;
    border: 2px solid #F2F2F2;
    border-radius: 6px;
font-size: 12px;
`;

export default StyledSelect;