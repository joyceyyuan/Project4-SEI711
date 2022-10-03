import React from 'react';
import { Message } from "semantic-ui-react";

export default function ErrorMessage(props) {
    return (
        <Message negative>
            <Message.Header className="arial">{props.error}</Message.Header>
        </Message>
    );
}