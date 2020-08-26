import React from 'react'
import './FriendSearchStyle.module.css'
import Container from '@material-ui/core/Container'
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

function FriendSearch() {
    return (
        <>
            <Container>
                <div className='header'>
                    <Grid container spacing={3}>
                        <Grid item sm={3}>
                            <h2 style={{ color: '#fff', marginTop: '2%' }}>Search Users</h2>
                        </Grid>
                        <Grid item sm={9}>
                            <input type='text' className='header_searchInput' />
                            {/* <Select /> */}
                            <Button><SearchIcon className='header_searchIcon' /></Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    )
}

export default FriendSearch