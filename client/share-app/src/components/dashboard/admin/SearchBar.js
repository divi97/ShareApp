import React from 'react';
import Container from '@material-ui/core/Container'
import './Search.css';
import SearchIcon from '@material-ui/icons/Search';


function SearchBar () {
    return (
        <>
        <Container>
        <nav className='header'>
        <div className='header_search'>
            <input type='text' className='header_searchInput' />
            <SearchIcon className='header_searchIcon'/>
        </div>
        </nav>
        </Container>
        {/* <div>Search BAR</div> */}
        </>
    )    
}

export default SearchBar