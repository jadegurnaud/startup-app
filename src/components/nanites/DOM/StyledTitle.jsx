import styled from "styled-components";

const StyledTitle = styled.h1`
    font-size: ${(props) => props.fontSize ?? "24px"};
`;

export default StyledTitle;