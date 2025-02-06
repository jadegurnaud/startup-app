import styled from "styled-components";

const StyledForm = styled.form.withConfig({
    shouldForwardProp: (prop) => !['backgroundColor', 'width'].includes(prop),
    })`
    background-color: ${(props) => props.backgroundColor ? props.backgroundColor : "transparent"};
    ${(props) => props.width ? 'width:' + props.width + ';' : ""}
`;

export default StyledForm;