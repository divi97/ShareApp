import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FriendList from './FriendList'
import UserListFriend from './UserListFriend'
// import FriendSearch from './FriendSearch'
import { Button } from '@material-ui/core';

const ButtonShare = withStyles(() => ({
    root: {
        color: '#fff',
        borderColor: '#000',
        backgroundColor: '#000',
        border: '1px solid',
        '&:hover': {
            backgroundColor: '#000',
            borderColor: '#000'
        }
    }
}))(Button)


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const onShare = () => {
    window.location = '/sharefiles'
}

function UserDash() {
    const classes = useStyles();

    useEffect(() => {
        document.title = "User Dashboard"
    })

    return (
        <>
            <div className={classes.root}>
                <Grid item sm={12}><h1 style={{ fontWeight: 'bold' }}>Welcome Back,</h1></Grid>
                <Grid item sm={12}><ButtonShare variant="contained" onClick={onShare}>Share Files</ButtonShare></Grid>
            </div>
            <div style={{ marginTop: '3%' }} />
            <div className={classes.root}>
                {/* <Grid item sm={12}>
                    <div style={{ marginTop: '3%' }} />
                    <FriendSearch />
                </Grid> */}
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