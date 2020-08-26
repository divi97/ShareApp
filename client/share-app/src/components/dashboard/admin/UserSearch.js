import React,{useState} from 'react';
import Container from '@material-ui/core/Container'
import './Search.css';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

// import Select from 'react-virtualized-select';
// import createFilterOptions from 'react-select-fast-filter-options';
// import 'react-select/dist/react-select.css';
// import 'react-virtualized/styles.css'
// import 'react-virtualized-select/styles.css'

// const options =[{value: '', label:''}]

// const filterOptions = createFilterOptions{{options}}

// const field = ({ options }) => (
//     <Select
//         name="university"
//         value="one"
//         options={options}
//         onChange={val => console.log(val)}
//     />
// );

function UserSearch () {
    const [search, setSearch] = useState({})

    const searchSpace = (event) => {
        let keyword = event.target.value;
        setSearch({search:keyword})
      }

    return (
        <>
        <Container>
        <div className='header'>
        <Grid container spacing={3}>
            <Grid item sm={3}>
            <h2 style={{color:'#fff', marginTop:'2%'}}>Search Users</h2>
            </Grid>
            <Grid item sm={9}>
            <input type='text' className='header_searchInput' onChange={(e) => searchSpace(e) }/>
            {/* <Select /> */}
            <Button><SearchIcon className='header_searchIcon'/></Button>
            </Grid>
            </Grid>
        </div>
        </Container>
        </>
    )    
}

export default UserSearch