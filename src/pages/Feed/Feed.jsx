import React, { useState, useEffect } from "react";
import PageHeader from "../../components/Header/Header";
import AddLog from "../../components/AddLog/AddLog";
import LogGallery from "../../components/LogGallery/LogGallery";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import { Grid } from "semantic-ui-react";
import * as logsAPI from "../../utils/logApi";

export default function Feed({ loggedUser, handleLogout }) {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function handleAddLog(log) {
        // log, is coming from the addlogForm component, when we call this function onSubmit props.handleAddlog(formData)
        try {
            setLoading(true);
            const response = await logsAPI.create(log); // waiting for the json to be return from the server and parsed by us!
            // data is the response from the api, the result of the .then if(res.ok) return res.json() in the create logAPI utils function
            console.log(response);
            setLogs([response.data, ...logs]); /// ...logs would keep all the logs in the previous states array
            setLoading(false);
        } catch (err) {
            console.log(err.message);
            setError("Error creating log, please try again");
        }
    }

    async function getLogs() {
        try {
            const response = await logsAPI.getAll();
            console.log(response, " data");
            setLogs([...response.data]);
            setLoading(false);
        } catch (err) {
            console.log(err.message, " this is the error");
            setLoading(false);
        }
    }
    
    useEffect(() => {
        //Getting logs, C(R)UD
        getLogs();
    }, []); // This is useEffect runs once when the Feed component loads

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
                        loggedUser={loggedUser}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}