import React from 'react';
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function LogCard({ log, isProfile, loggedUser }) {
    return (
        <Card key={log._id} raised>
            {isProfile ? (
                ""
            ) : (
                <Card.Content textAlign="left">
                    <Card.Header>
                        <Link to={`/${log.user.username}`}>
                            <Image
                                size="large"
                                avatar
                                src={
                                    log.user.photoUrl
                                        ? log.user.photoUrl
                                        : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                                }
                            />
                            {log.user.username}
                        </Link>
                    </Card.Header>
                </Card.Content>
            )}
            <Image src={`${log?.photoUrl}`} wrapped ui={false} />
            <Card.Content>
                <Card.Description>{log.journal}</Card.Description>
            </Card.Content>
        </Card>
    );
}