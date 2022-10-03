import React, { useState } from 'react';
import { Card, Icon, Image, Modal, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function LogCard({ log, isProfile, addLike, removeLike, deleteLog, loggedUser }) {
    const [open, setOpen] = useState(false);
    const date = new Date(log.createdAt);
    const formattedDate = date.toLocaleString();

    //check if logged in user have liked the post
    const likedIndex = log.likes.findIndex(
        (like) => like.username === loggedUser.username
    );
    const likeColor = likedIndex > -1 ? "red" : "grey";
    const clickHandler =
        likedIndex > -1
            ? () => removeLike(log.likes[likedIndex]._id) // user has liked the log 
            : () => addLike(log._id);  // user hasn't liked the log handler

    return (
        <Card key={log._id} raised>
            {isProfile ? (
                <span>{log.category} <Icon name={"point"}/>{log.location}</span>
            ) : (
                <Card.Content>
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
                    <Card.Description as="h5">{log.category} <Icon name={"point"}/>{log.location}</Card.Description>
                </Card.Content>
            )}
            <Image src={`${log?.photoUrl}`} wrapped ui={false} />
            <Card.Content>
                <Card.Description>{log.title}</Card.Description>
                <Card.Meta>{log.text}</Card.Meta>
            </Card.Content>
            <Card.Meta textAlign={"right"}>{formattedDate}</Card.Meta>
            <Card.Content extra textAlign={"right"}>
                {loggedUser._id === log.user._id ?
                    <Modal
                        closeIcon
                        open={open}
                        trigger={<Icon
                            name={"trash alternate outline"}
                        />}
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                    >
                        <Modal.Header>Delete Your Travelog</Modal.Header>
                        <Modal.Content>
                            <p>
                                Are you sure you want to delete it?
                            </p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='red' onClick={() => setOpen(false)}>
                                <Icon name='remove' /> No
                            </Button>
                            <Button color='green' onClick={() => deleteLog(log._id)}>
                                <Icon name='checkmark' /> Yes
                            </Button>
                        </Modal.Actions>
                    </Modal> : <>
                    </>
                }
                <Icon
                    name={"heart"}
                    size="large"
                    color={likeColor}
                    onClick={clickHandler}
                />
                {log.likes.length}
            </Card.Content>
        </Card>
    );
}