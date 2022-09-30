import React from 'react';
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function LogCard({ log, isProfile, addLike, removeLike, deleteLog, loggedUser }) {
    //check if logged in user have liked the post
    const likedIndex = log.likes.findIndex(
        (like) => like.username === loggedUser.username
    );
    const likeColor = likedIndex > -1 ? "red" : "grey";
    const clickHandler =
        likedIndex > -1
            ? () => removeLike(log.likes[likedIndex]._id) // user has liked the log 
            : () => addLike(log._id);  // user hasn't liked the log handler
    console.log(log.user.username, "<-log.user.username");
    console.log(log.user.photoUrl, "<-log.user.photoUrl");

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
                <Card.Description>{log.title}</Card.Description>
                <Card.Meta>{log.text}</Card.Meta>
            </Card.Content>
            <Card.Content extra textAlign={"right"}>
                <Icon
                    name={"trash alternate outline"}
                    onClick={deleteLog}
                />
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