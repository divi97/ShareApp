import React, {useEffect, useState} from 'react';
import axios from 'axios'
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
    const [ActiveCount, setActiveCount] = useState(0)
    const [TotalCount, setTotalCount] = useState(0)


    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:1234/activeusers")
            setActiveCount(res.data)
            const resp = await axios.get("http://localhost:1234/usercount")
            setTotalCount(resp.data)
        }

        fetchData()
    });

    return (
        <>
        <h1>Statistics</h1>
        <hr style={{width: '60%'}}/>
        <br />
        <Container>

        <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item sm={4}>
                <div className={styles.box}>
                    <StyledPersonIcon/>
                    <div><h2 style={{color:'#fff'}}>Users</h2></div>
                    <div><h4 style={{color:'#fff'}}>10</h4></div>
                </div>
            </Grid>
            <Grid item sm={4}>
            <div className={styles.box}>
                <StyledPersonOutlineIcon/>
                <div><h2 style={{color:'#fff'}}>Online Users</h2></div>
                <div><h4 style={{color:'#fff'}}>{ActiveCount}</h4></div>
            </div>
            </Grid>
            <Grid item sm={4}>
            <div className={styles.box}>
                <StyledHowToReg />
                <div><h2 style={{color:'#fff'}}>Registered Users</h2></div>
                <div><h4 style={{color:'#fff'}}>{TotalCount}</h4></div>
            </div>
            </Grid>
        </Grid>
        </div>
        </Container>
        </>
    )
}

export default Analysis