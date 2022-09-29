import React, { useState, useEffect, useCallback } from "react";
import { Grid } from "semantic-ui-react";
import Profile from "../../components/Profile/Profile";
import LogGallery from "../../components/LogGallery/LogGallery";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import { useParams } from "react-router-dom";

export default function ProfilePage({ loggedUser, handleLogout }) {
    const [logs, setLogs] = useState([]);
    const [profileUser, setProfileUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { username } = useParams(); // username is defined in the App folder in the Router path="/:username"


    const getProfile = useCallback(async () => {
        try {
            const response = await userService.getProfile(username); // this line evaluates to what the server responds to the request with
            // after we get the response to the server
            // so lets flip the loading state
            setLoading(false);
            setProfileUser(response.data.user);
            setLogs(response.data.logs);
            console.log(response);
        } catch (err) {
            console.log(err.message);
            setError("Profile does not exist! You are in the wrong in place");
        }
    }, [username]);

    useEffect(() => {
        console.log("firing!");
        getProfile();
    }, [username, getProfile]);

    if (error) {
        return (
            <>
                <Header handleLogout={handleLogout} loggedUser={loggedUser} />
                <ErrorMessage error={error} />;
            </>
        );
    }

    if (loading) {
        return (
            <>
                <Header handleLogout={handleLogout} loggedUser={loggedUser} />
                <Loading />
            </>
        );
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Header handleLogout={handleLogout} loggedUser={loggedUser} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Profile user={profileUser} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column style={{ maxWidth: 900 }}>
                    <LogGallery
                        logs={logs}
                        numPhotosCol={3}
                        isProfile={true}
                        loading={loading}
                        loggedUser={loggedUser}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}
