import React from "react";
import { DOM } from "../../nanites";

const Paragraph = (props) => {
    return <DOM.StyledParagraph className="paragraph" {...props}></DOM.StyledParagraph>;
}

export default Paragraph;