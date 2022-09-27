import React, { useState } from "react";

import PageHeader from "../../components/Header/Header";
import AddLog from "../../components/AddLog/AddLog";
import LogGallery from "../../components/LogGallery/LogGallery";

import { Grid } from "semantic-ui-react";

export default function Feed() {
    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 600 }}>
                    <AddLog />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 600 }}>
                    <LogGallery />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}