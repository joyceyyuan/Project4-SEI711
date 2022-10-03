import React, { useState } from 'react';
import { Button, Form, TextArea, Segment, Header, Dropdown } from 'semantic-ui-react';
// import "./AddLog.css";

export default function AddLog({ handleAddLog }) {
    const [logForm, setLogForm] = useState({
        category: "",
        location: "",
        title: "",
        text: "",
    });

    const categoryOptions = [
        {
            key: 'I am going to',
            text: 'I am going to',
            value: 'I am going to',
        },
        {
            key: 'I went to',
            text: 'I went to',
            value: 'I went to',
        }

    ]
    const [selectedCategory, setSelectedCategory] = useState("");

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
        formData.append("category", selectedCategory);
        formData.append("location", logForm.location);
        formData.append("title", logForm.title);
        formData.append("text", logForm.text);
        console.log(formData, '<-this is formData');
        handleAddLog(formData); // formData is the data we want to send to the server!
    }

    return (
        <Segment>
            <Header as="h2" color='blue' floated="left">
                Plan, record and share your trips.
            </Header>
            <Form autoComplete="off" onSubmit={handleSubmit}>
                <Dropdown
                    placeholder='Select Category'
                    fluid
                    selection
                    value={selectedCategory}
                    onChange={(e,data) => setSelectedCategory(data.value)}
                    options={categoryOptions}
                />
                <Form.Input
                    className="form-control"
                    name="location"
                    value={logForm.location}
                    placeholder="Enter destination"
                    style={{ width: 542 }}
                    onChange={handleChange}
                    inline
                    required
                />
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