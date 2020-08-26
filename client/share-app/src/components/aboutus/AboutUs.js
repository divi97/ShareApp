import React, {useEffect} from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles'
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      marginTop:'5%',
      width: '100%',
      backgroundColor:'#dcdde1'
    },
    title: {
      fontSize: 19,
    },
    pos: {
      marginBottom: 12,
      color:'#000'
    },
});


function AboutUs() {
    const classes = useStyles();
    
    useEffect(() => {
        document.title = "About us"
    })
    
    return (
        <>
        <Container>
        <div>
            <h1>About Us</h1>
            <hr style={{ width: '50%' }} />
            <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.pos} color="textSecondary">ABOUT US</Typography>
            </CardContent>
            <CardActions><Button>Back</Button></CardActions>
            </Card>
        </div>
        </Container>
        </>
    )
}

export default AboutUs