import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
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

const StyledButtonBlock = withStyles(() => ({
    root: {
      color: '#d63031',
      borderColor: '#d63031',
      border: '1px solid',
      '&:hover': {
        backgroundColor: '#EF9A9A',
        borderColor: '#d63031'
      }
    }
}))(Button)

const StyledButtonUnBlock = withStyles(() => ({
  root: {
    color: '#43A047',
    borderColor: '#43A047',
    border: '1px solid',
    '&:hover': {
      backgroundColor: '#A5D6A7',
      borderColor: '#43A047'
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
}));

const blockStateToggler = (blockedStatus, id) => {
  console.log(id, blockedStatus)
  blockedStatus = !blockedStatus
  axios.put(`http://localhost:1234/user/updateblocked/${id}`, {blockedStatus:blockedStatus})
}


function UserList(props) {
    const classes = useStyles();
    const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:1234/user/userlist")
      setList(res.data.users)
    }

    fetchData()
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <hr style={{width: '60%'}}/>
      <br />
      <React.Fragment>
        <StyledGrid item md={8}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Joined On</StyledTableCell>
                  <StyledTableCell>Access Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((row, index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">⇨</StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>{row.email}</StyledTableCell>
                    <StyledTableCell>{row.createdAt}</StyledTableCell>
                    <StyledTableCell>{row.blocked === false ? 
                    (<StyledButtonBlock variant="outlined" type="button" onClick={() => { blockStateToggler(row.blocked, row.id) }}>Block</StyledButtonBlock>) : 
                    (<StyledButtonUnBlock variant="outlined" type="button" onClick={() => { blockStateToggler(row.blocked, row.id) }}>Unblock</StyledButtonUnBlock>) }
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledGrid>
      </React.Fragment>
      <br/>
    </div>)
  }

  export default UserList