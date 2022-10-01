import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import "./Feed.css";

import PageHeader from "../../components/Header/Header";
import AddLog from "../../components/AddLog/AddLog";
import LogGallery from "../../components/LogGallery/LogGallery";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";

import * as logAPI from "../../utils/logApi";
import * as likesAPI from "../../utils/likesApi";


export default function Feed({ loggedUser, handleLogout }) {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // functions that will make http request to the /logs/api endpoints
    async function addLike(logId) {
        try {
            const response = await likesAPI.create(logId);
            console.log(response, "from add like");
            getLogs();
        } catch (err) {
            console.log(err, " err from server");
            setError("error adding like");
        }
    }

    async function removeLike(likeId) {
        try {
            const response = await likesAPI.removeLike(likeId);
            console.log(response, " remove like");
            getLogs();
        } catch (err) {
            console.log(err);
            setError("error removing like");
        }
    }

    async function handleAddLog(log) {
        try {
            setLoading(true);
            const response = await logAPI.create(log);
            console.log(response);
            setLogs([response.data, ...logs]);
            getLogs();
            setLoading(false);
        } catch (err) {
            console.log(err.message);
            setError("Error creating log, please try again");
        }
    }

    async function handleDeleteLog(logId) {
        try {
            // console.log(logId,"<-logId in handleDeleteLog")
            const response = await logAPI.deleteLog(logId);
            console.log(response,", delete log");
            getLogs();
        } catch (err) {
            console.log(err);
            setError("Error deleting log, please try again");
        }
    }

    async function getLogs() {
        try {
            const response = await logAPI.getAll();
            console.log(response, " data from getLogs");
            setLogs([...response.data]);
            setLoading(false);
        } catch (err) {
            console.log(err.message, " this is the error");
            setLoading(false);
        }
    }


    useEffect(() => {
        getLogs();
    }, []);

    if (error) {
        return (
            <>
                <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
                <ErrorMessage error={error} />;
            </>
        );
    }
    if (loading) {
        return (
            <>
                <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
                <Loading />
            </>
        );
    }
    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 600 }}>
                    <AddLog handleAddLog={handleAddLog} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 600 }}>
                    <LogGallery
                        logs={logs}
                        numPhotosCol={1}
                        isProfile={false}
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