import React, { useState } from 'react';
import { Button, Form, TextArea, Segment, Header } from 'semantic-ui-react';
// import "./AddLog.css";

export default function AddLog({handleAddLog}) {
    const [logForm, setLogForm] = useState({
        title: "",
        text: ""
    });
    // The function that handles the changes on the input, Look at the inputs for the name of it
    const [selectedFile, setSelectedFile] = useState("");

    function handleFileInput(e) {
        console.log(e.target.files, " < - this is e.target.files");
        setSelectedFile(e.target.files[0]);
    }

    function handleChange(e) {
        setLogForm({
            ...logForm,
            [e.target.name]: e.target.value,
        });
        console.log(logForm, '<-this is logForm')
    }

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("photo", selectedFile);
        formData.append("title", logForm.title);
        formData.append("text", logForm.text);
        console.log(formData,'<-this is formData');
        handleAddLog(formData); // formData is the data we want to send to the server!
    }

    return (
        <Segment>
            <Header as="h2" color='blue' floated="left">
                Plan, record and share your trips.
            </Header>
            <Form autoComplete="off" onSubmit={handleSubmit}>
                <Form.Input
                    className="form-control"
                    name="title"
                    value={logForm.title}
                    placeholder="Enter title"
                    style={{ width: 542 }}
                    onChange={handleChange}
                    inline
                    required
                />
                <TextArea
                    className="form-control"
                    name="text"
                    value={logForm.text}
                    placeholder="Tell us more about your trip..."
                    style={{ minHeight: 200 }}
                    onChange={handleChange}
                />
                <Form.Input
                    className="form-control"
                    type="file"
                    name="photo"
                    label="Upload Image"
                    placeholder="upload image"
                    style={{ width: 405, margin: 14 }}
                    onChange={handleFileInput}
                    inline
                    required
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
        </Segment >
    )
}