import React from "react";
import { Form } from "../atoms";

const FormComponent = ({ children, ...props }) => {
    return <Form.Base {...props}>{children}</Form.Base>;
    };

export default FormComponent;