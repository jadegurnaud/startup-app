import styled from "styled-components";

const StyledInput = styled.input`
    background-color: ${(props) => props.$backgroundColor ?? "transparent"};
    ${(props) => props.$width ? 'width:' + props.$width + ';' : ""}
    border: ${(props) => props.$border ?? "1px solid #ccc"};
    padding: ${(props) => props.$padding ?? "0.6rem"};
    border-radius: ${(props) => props.$borderRadius ?? "0.3rem"};
    font-size: ${(props) => props.$fontSize ?? "1rem"};
    color: ${(props) => props.theme.colors.colors.primary};
    outline: none;
    box-shadow: ${(props) => props.$boxShadow ?? "none"};
    &:focus {
        border-color: ${(props) => props.$focusBorderColor ?? "#007BFF"};
        box-shadow: ${(props) => props.$focusBoxShadow ?? "0 0 0.5rem rgba(0, 123, 255, 0.5)"};
    }
`;

export default StyledInput;