import React, { useState, useEffect, useCallback } from "react";
import { Grid,Icon } from "semantic-ui-react";
import "./Profile.css";
import Profile from "../../components/Profile/Profile";
import LogGallery from "../../components/LogGallery/LogGallery";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import userService from "../../utils/userService";
import * as likesAPI from "../../utils/likesApi";
import * as logAPI from "../../utils/logApi";
import { useParams } from "react-router-dom";


export default function ProfilePage({ loggedUser, handleLogout }) {
    const [logs, setLogs] = useState([]);
    const [profileUser, setProfileUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { username } = useParams();

    async function addLike(logId) {
        try {
            const response = await likesAPI.create(logId);
            console.log(response, "from add like");
            getProfile();
        } catch (err) {
            console.log(err, " err from server");
        }
    }

    async function removeLike(likeId) {
        try {
            const response = await likesAPI.removeLike(likeId);
            console.log(response, " remove like");
            getProfile();
        } catch (err) {
            console.log(err);
        }
    }

    async function handleDeleteLog(logId) {
        try {
            const response = await logAPI.deleteLog(logId);
            console.log(response, " delete log");
            getProfile();
        } catch (err) {
            console.log(err);
        }
    }

    const getProfile = useCallback(async () => {
        try {
            const response = await userService.getProfile(username);
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
                    <Profile user={profileUser} logsNumber={logs.length}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>

            <span>{logs.category}<Icon name={"point"} />{logs.location}</span>

            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column style={{ maxWidth: 1200 }}>
                    <LogGallery
                        logs={logs}
                        numPhotosCol={3}
                        isProfile={true}
                        loading={loading}
                        addLike={addLike}
                        removeLike={removeLike}
                        deleteLog={handleDeleteLog}
                        loggedUser={loggedUser}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}
