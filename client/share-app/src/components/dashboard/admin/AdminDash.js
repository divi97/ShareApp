import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Analysis from './Analysis'
import UserList from './UserList'
// import UserSearch from './UserSearch';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));


function AdminDash() {
  const classes = useStyles();

  useEffect(() => {
    document.title = "Admin Dashboard"
  })

  return (
    <>
      <h1 style={{ fontWeight: 'bold' }}>Welcome Back,</h1>
      <div style={{ marginTop: '3%' }} />
      <div className={classes.root}>
        {/* <Grid item sm={12}>
      <div style={{marginTop:'3%'}}/>
          <UserSearch/>
        </Grid> */}
        {/* <hr style={{width: '80%'}}/> */}
        <Grid item sm={12}>
          <div style={{ marginTop: '3%' }} />
          <Analysis />
        </Grid>
        <hr style={{ width: '80%' }} />
        <Grid item sm={12}>
          <div style={{ marginTop: '3%' }} />
          <UserList />
          <hr style={{ width: '80%' }} />
        </Grid>
      </div>
    </>
  );
}

export default AdminDash;