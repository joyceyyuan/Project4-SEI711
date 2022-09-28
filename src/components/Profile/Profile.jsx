import { Image, Grid, Segment } from "semantic-ui-react";

export default function Profile({ user }) {
    return (
        <Grid textAlign="center" columns={2}>
            <Grid.Row>
                <Grid.Column>
                    <Image
                        src={`${user.photoUrl
                                ? user.photoUrl
                                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                            } `}
                        avatar
                        size="small"
                    />
                </Grid.Column>
                <Grid.Column textAlign="left" style={{ maxWidth: 600 }}>
                    <Segment vertical>
                        <h4>{user.username}</h4>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}
