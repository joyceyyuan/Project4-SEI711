import React from 'react';
import { Card, Dimmer, Segment, Image } from 'semantic-ui-react'
import LogCard from '../LogCard/LogCard';
import Loader from '../Loader/Loader';

export default function LogGallery({ logs, numPhotosCol, isProfile, loading, addLike, removeLike, deleteLog, loggedUser, formattedDate }) {
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
                        addLike={addLike}
                        removeLike={removeLike}
                        deleteLog={deleteLog}
                        loggedUser={loggedUser}
                        formattedDate={formattedDate}
                    />
                );
            })
            .sort((a, b) => b.formattedDate - a.formattedDate)}
        </Card.Group>
    )
}
