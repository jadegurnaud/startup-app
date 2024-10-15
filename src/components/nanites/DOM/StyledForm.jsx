import styled from "styled-components";

const StyledForm = styled.form`
    background-color: ${(props) => props.$backgroundColor ?? "transparent"};
    ${(props) => props.$width ? 'width:' + props.$width + ';' : ""}
`;

export default StyledForm;