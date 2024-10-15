import styled from "styled-components";

const StyledInput = styled.input`
    background-color: ${(props) => props.$backgroundColor ?? "transparent"};
    ${(props) => props.$width ? 'width:' + props.$width + ';' : ""}
    border: ${(props) => props.$border ?? "1px solid #ccc"};
    padding: ${(props) => props.$padding ?? "10px"};
    border-radius: ${(props) => props.$borderRadius ?? "5px"};
    font-size: ${(props) => props.$fontSize ?? "16px"};
    color: ${(props) => props.$color ?? "#000"};
    outline: none;
    box-shadow: ${(props) => props.$boxShadow ?? "none"};
    &:focus {
        border-color: ${(props) => props.$focusBorderColor ?? "#007BFF"};
        box-shadow: ${(props) => props.$focusBoxShadow ?? "0 0 5px rgba(0, 123, 255, 0.5)"};
    }
`;

export default StyledInput;