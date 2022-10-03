import React from 'react';
import { Link } from "react-router-dom";
import { Header, Segment, Image, Icon} from 'semantic-ui-react';

export default function PageHeader({ loggedUser, handleLogout }) {
    return (
        <Segment className="header" clearing>
            <Header floated="right">
                <Link to="/">
                    <Icon name="home"></Icon>
                </Link>
                <Link to="/login" onClick={handleLogout}>
                    Log Out
                </Link>
            </Header>
            <Header floated="left">
                <Link to={`/${loggedUser?.username}`}>
                    <Image
                        src={
                            loggedUser?.photoUrl
                                ? loggedUser?.photoUrl
                                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                        }
                        avatar
                    ></Image>
                </Link>
                <span >Hi, {loggedUser.username} </span>
            </Header>
        </Segment>
    )
}