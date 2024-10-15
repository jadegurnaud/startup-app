import styled from "styled-components";

const StyledTitle = styled.h1`
    padding-left: ${(props) => props.$paddingLeft ?? "10px"};
`;

export default StyledTitle;