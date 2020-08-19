import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import PersonIcon from '@material-ui/icons/Person';
import styles from '../../../utils/analysisStyles.module.css'
import { withStyles } from '@material-ui/core/styles'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import HowToRegIcon from '@material-ui/icons/HowToReg';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));

const StyledPersonIcon = withStyles(() => ({
    root: {
        fontSize: '2.5rem',
        color: '#fff'
    },
  }
))(PersonIcon);

const StyledPersonOutlineIcon = withStyles(() => ({
    root: {
        fontSize: '2.5rem',
        color: '#2ecc71'
    },
  }
))(PersonOutlineIcon);

const StyledHowToReg = withStyles(() => ({
    root: {
        fontSize: '2.5rem',
        color: '#3498db'
    },
  }
))(HowToRegIcon);


function Analysis () {
    const classes = useStyles();

    return (
        <>
        <Container>

        <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item sm={4}>
                <div className={styles.box}>
                    <StyledPersonIcon/>
                    <div><h2 style={{color:'#fff'}}>Users</h2></div>
                </div>
            </Grid>
            <Grid item sm={4}>
            <div className={styles.box}>
                <StyledPersonOutlineIcon/>
                <div><h2 style={{color:'#fff'}}>Active Users</h2></div>
            </div>
            </Grid>
            <Grid item sm={4}>
            <div className={styles.box}>
                <StyledHowToReg />
                <div><h2 style={{color:'#fff'}}>Registered Users</h2></div>
            </div>
            </Grid>
        </Grid>
        </div>
        </Container>
        </>
    )
}

export default Analysis