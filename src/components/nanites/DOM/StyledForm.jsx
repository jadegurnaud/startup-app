import styled from "styled-components";

const StyledForm = styled.form`
    background-color: ${(props) => props.$backgroundColor ? props.$backgroundColor : props.theme.colors.containers.secondary};
    ${(props) => props.$width ? 'width:' + props.$width + ';' : ""}
`;

export default StyledForm;