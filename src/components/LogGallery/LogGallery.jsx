import React from 'react';
import { Card, Dimmer, Segment, Image } from 'semantic-ui-react'
import LogCard from '../LogCard/LogCard';
import Loader from '../Loader/Loader';

export default function LogGallery({ logs, numPhotosCol, isProfile, loading, loggedUser }) {
    return (
        <Card.Group itemsPerRow={numPhotosCol} stackable>
            {loading ? (
                <Segment>
                    <Dimmer active inverted>
                        <Loader size="medium">Loading</Loader>
                    </Dimmer>
                    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </Segment>
            ) : null}
            {logs.map((log) => {
                return (
                    <LogCard
                        log={log}
                        key={log._id}
                        isProfile={isProfile}
                        loggedUser={loggedUser}
                    />
                );
            })}
        </Card.Group>
    )
}
