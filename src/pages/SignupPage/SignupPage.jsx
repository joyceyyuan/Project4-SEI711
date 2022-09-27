import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";

// Utility functions that don't pertain to the component can 
// be defined outside it

function isPasswordMatch(passwordOne, passwordConf) {
  return passwordOne === passwordConf;
}

export default function SignUpPage(props) {
  const [error, setError] = useState({
    message: '',
    passwordError: false
  });
  
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
    bio: "",
  });

  const [selectedFile, setSelectedFile] = useState("");

  // initialized the react router hook, which allows you to programatically
  // change routes, aka after our signup call in the handleSubmit
  const navigate = useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault(); // this stop the browser from submitting the form!

    if (!isPasswordMatch(state.password, state.passwordConf)) return setError({message: 'Passwords Must Match!', passwordError: true});
    setError({message: '', passwordError: false})
    // Create formData, so we can send over our file, using multipart/formdata header
    // which sends over the basic inputs, and then the file

    const formData = new FormData(); //< - this constructor from the browser allows us to create data
    // now we can set key value pairs on the formData
    formData.append("photo", selectedFile);
    // Line by line tactic
    // formData.append('username', state.username);
    // formData.append('email', state.email);
    // and so on for the rest or our state

    // A more robust way to generate the rest of the formData is using a loop!
    // loop over our state object using a for ... in loop
    for (let key in state) {
      formData.append(key, state[key]);
    }

    console.log(
      formData,
      " <- form Data, you cant see this!",
      "you have to loop over it"
    );
    console.log(
      formData.forEach((item) => console.log(item)),
      " < This lets you see the key values in formData"
    );

    try {
      await userService.signup(formData);
      props.handleSignUpOrLogin();
      navigate("/"); 
    } catch (err) {
      console.log(err);
      setError({message: err.message, passwordError: false});
    }
  }

  function handleFileInput(e) {
    console.log(e.target.files, " < - this is e.target.files!");
    setSelectedFile(e.target.files[0]);
  }

  return (
    <Grid
      textAlign="center"
      style={{ height: "100vh", width: "100vw" }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          <Image src="https://cdn-icons-png.flaticon.com/512/744/744502.png"  /> Sign Up
        </Header>
        <Form onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              error={error.passwordError}
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              error={error.passwordError}
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          {error.message ? <ErrorMessage error={error.message} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}
