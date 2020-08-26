import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Container from '@material-ui/core/Container'
import SearchIcon from '@material-ui/icons/Search';
import styles from './FriendSearchStyle.module.css'
// import TablePagination from '@material-ui/core/TablePagination';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  root: {
    textTransform: 'none',
    fontWeight: 'bold'
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledGrid = withStyles((theme) => ({
  item: {
    marginLeft: '16%'
  }
}))(Grid)

const StyledButtonV = withStyles(() => ({
  root: {
    color: '#3f51b5',
    borderColor: '#3f51b5',
    border: '1px solid',
    '&:hover': {
      backgroundColor: '#D1C4E9',
      borderColor: '#3f51b5'
    }
  }
}))(Button)

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  image: {
    width: theme.spacing(5.5),
    height: theme.spacing(5.5)
  }
}));

function FriendList(props) {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [search, setSearch] = useState(null)

  const searchSpace = (event) => {
    let keyword = event.target.value;
    setSearch(keyword)
  }

  const removeFriend = async (id) => {
    const userid = localStorage.getItem("id")
    await axios.put(`http://localhost:1234/friend/removefriend/${id}`, { id: userid })
    fetchData()
  }

  const fetchData = async () => {
    const userid = localStorage.getItem("id")
    const res = await axios.post(`http://localhost:1234/friend/friendlist/${userid}`)
    console.log(res.data.friendlist)
    setList(res.data.friendlist)
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div>
      <h1>Friends List</h1>
      <hr style={{ width: '60%' }} />
      <br />
      <br />

      <Container>
        <div className={styles.header}>
          <Grid container spacing={3}>
            <Grid item sm={3}>
              <h2 style={{ color: '#fff', marginTop: '2%' }}>Search Users</h2>
            </Grid>
            <Grid item sm={9}>
              <input type='text' className={styles.header_searchInput} onChange={searchSpace} />
              <Button><SearchIcon className={styles.header_searchIcon} /></Button>
            </Grid>
          </Grid>
        </div>
      </Container>
      <br />
      <br />
      <React.Fragment>
        <StyledGrid item md={8}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>Profile Pic</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Remove Friend</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.filter((row) => {
                  if (search == null) {
                    return row
                  } else if (row.friendId.name.toLowerCase().includes(search.toLowerCase()) || row.friendId.email.toLowerCase().includes(search.toLowerCase())) {
                    return row
                  } else {
                    return null
                  }
                }).map((row, index) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">⇨</StyledTableCell>
                    <StyledTableCell><Avatar className={classes.image} alt="" src={`http://localhost:1234/${row.friendId.profile}`} /></StyledTableCell>
                    <StyledTableCell>{row.friendId.name}</StyledTableCell>
                    <StyledTableCell>{row.friendId.email}</StyledTableCell>
                    <StyledTableCell><StyledButtonV variant="outlined" type="button" onClick={() => { removeFriend(row.friendId._id) }}>Remove Friend</StyledButtonV></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledGrid>
      </React.Fragment>
      <br />
    </div>)
}

export default FriendList