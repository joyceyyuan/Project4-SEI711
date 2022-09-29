import React, { useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';


export default function AddLog(props) {
    // create the state, pay attention to how the inputs are setup!
    const [state, setState] = useState({
        text: "",
    });
    // The function that handles the changes on the input, Look at the inputs for the name of it
    const [selectedFile, setSelectedFile] = useState("");

    function handleFileInput(e) {
        console.log(e.target.files, " < - this is e.target.files");
        setSelectedFile(e.target.files[0]);
    }

    function handleChange(e) {
        setState({
            text: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("photo", selectedFile);
        formData.append("text", state.text);
        props.handleAddLog(formData); // formData is the data we want to send to the server!
    }

    return (
        <Segment>
            <Form autoComplete="off" onSubmit={handleSubmit}>
                <Form.Input
                    className="form-control"
                    name="text"
                    value={state.text}
                    placeholder="Write anything about your trip"
                    onChange={handleChange}
                    required
                />
                <Form.Input
                    className="form-control"
                    type="file"
                    name="photo"
                    placeholder="upload image"
                    onChange={handleFileInput}
                />
                <Button
                    color="blue"
                    fluid
                    size="large"
                    type="submit"
                    className="btn"
                >
                    Add a trip
                </Button>
            </Form>
        </Segment>
    )
}