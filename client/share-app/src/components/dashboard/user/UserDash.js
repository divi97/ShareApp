import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FriendList from './FriendList'
import UserListFriend from './UserListFriend'
import FriendSearch from './FriendSearch'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

function UserDash() {
    const classes = useStyles();

    useEffect(() => {
        document.title = "User Dashboard"
    })

    return (
        <>
            <h1 style={{ fontWeight: 'bold' }}>Welcome Back,</h1>
            <div style={{ marginTop: '3%' }} />
            <div className={classes.root}>
                <Grid item sm={12}>
                    <div style={{ marginTop: '3%' }} />
                    <FriendSearch />
                </Grid>
                <Grid item sm={12}>
                    <div style={{ marginTop: '3%' }} />
                    <UserListFriend />
                </Grid>
                <hr style={{ width: '80%' }} />
                <Grid item sm={12}>
                    <div style={{ marginTop: '3%' }} />
                    <FriendList />
                    <hr style={{ width: '80%' }} />
                </Grid>
            </div>
        </>
    );
}

export default UserDash;