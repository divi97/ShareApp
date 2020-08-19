import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Analysis from './Analysis'
import UserList from './UserList'
import SearchBar from './SearchBar';

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
    <div className={classes.root}>
      <Grid item sm={12}>
        <br/>
          <SearchBar />
        </Grid>
        <hr style={{width: '80%'}}/>
        <Grid item sm={12}>
        <br/>
          <Analysis />
        </Grid>
        <hr style={{width: '80%'}}/>
        <Grid item sm={12}>
          <UserList />
        </Grid>
    </div>
  );
}

export default AdminDash;

// Note: Make a grid and place components there