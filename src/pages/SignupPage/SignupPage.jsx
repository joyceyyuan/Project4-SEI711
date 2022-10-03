import React, { useState } from "react";
import './SignupPage.css';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";
import userService from "../../utils/userService";
import { useNavigate, Link } from "react-router-dom";

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
  });

  const [selectedFile, setSelectedFile] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isPasswordMatch(state.password, state.passwordConf)) return setError({ message: 'Passwords Must Match!', passwordError: true });
    setError({ message: '', passwordError: false })

    const formData = new FormData();
    formData.append("photo", selectedFile);

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
      setError({ message: err.message, passwordError: false });
    }
  }

  function handleFileInput(e) {
    console.log(e.target.files, " < - this is e.target.files!");
    setSelectedFile(e.target.files[0]);
  }

  return (
    <div className="login-signup-body">
      <Segment clearing>
        <Header floated="left">
          <Image src="https://cdn-icons-png.flaticon.com/512/744/744502.png" size='small' />
          Welcome to Travelog. Plan, record and share your trips.
        </Header>
      </Segment>
      <Grid
        textAlign="center"
        style={{ height: 1000, width: "100vw" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header textAlign="center">
            Sign Up
          </Header>
          <Form onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                name="username"
                placeholder="Username"
                value={state.username}
                onChange={handleChange}
                required
              />
              <Form.Input
                type="email"
                name="email"
                placeholder="Email"
                value={state.email}
                onChange={handleChange}
                required
              />
              <Form.Input
                error={error.passwordError}
                name="password"
                type="password"
                placeholder="Password"
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
                  placeholder="Upload Image"
                  onChange={handleFileInput}
                />
              </Form.Field>
              <Button
                color="blue"
                fluid
                size="large"
                type="submit"
                className="btn">
                Sign up
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <Link to="/login">Log In</Link>
          </Message>
          {error.message ? <ErrorMessage error={error.message} /> : null}
        </Grid.Column>
      </Grid>
    </div>
  );
}
