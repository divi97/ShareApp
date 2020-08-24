import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        //  minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        color:'#fff',
        position: 'sticky',
        height: 'auto',
        backgroundColor: '#181818',
        bottom: '0px',
        left: '0px',
        right: '0px',
        marginTop: '10%',
        marginBottom: '0px'
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (

        <div className={classes.root}>
            <CssBaseline></CssBaseline>
            <Box>
                <footer className={classes.footer}>
                    <Typography variant="h6" align="center">
                        Developed with {<FavoriteIcon />}
                    </Typography>
                    <Typography variant="subtitle1" align="center" component="p">Copyrights @ 2020. ShareApp. All rights reserved.</Typography>
                    <Link color="inherit" href="/aboutus" style={{textDecoration:'none'}}>About Us &nbsp;&nbsp;&nbsp;</Link>
                    <Link color="inherit" href="/tnc" style={{textDecoration:'none'}}>Terms and Conditions</Link>
                </footer>
            </Box>
        </div>
    );
}