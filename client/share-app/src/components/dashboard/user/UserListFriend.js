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
import Avatar from '@material-ui/core/Avatar'

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

const StyledButtonAddFriend = withStyles(() => ({
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
}));



function UserListFriend(props) {
    const classes = useStyles();
    const [list, setList] = useState([]);
    
    const addFriend = (id) => {
        const userid = localStorage.getItem("id")
        axios.put(`http://localhost:1234/friend/addtofriendlist/${id}`,{id : userid})
        .then(response => {
            console.log(response.data)
            alert("Your friend has been added successfully!!")
        })
        .catch(err => {
            console.log(err.data)
            alert("Your friend is already in your friends list")
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            const userid = localStorage.getItem("id")
            const res = await axios.post(`http://localhost:1234/friend/userlistoffriend/${userid}`)
            setList(res.data.users)
        }

        fetchData()
    }, []);

    return (
        <div>
            <h1>Users List</h1>
            <hr style={{ width: '60%' }} />
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
                                    <StyledTableCell>Add Friend</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list.map((row, index) => row.id !== localStorage.getItem("id") ? (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell component="th" scope="row">⇨</StyledTableCell>
                                        <StyledTableCell><Avatar alt="" src={`http://localhost:1234/${row.profile}`} /></StyledTableCell>
                                        <StyledTableCell>{row.name}</StyledTableCell>
                                        <StyledTableCell>{row.email}</StyledTableCell>
                                        <StyledTableCell><StyledButtonAddFriend variant="outlined" type="button" onClick={() => { addFriend(row.id) }}>Add Friend</StyledButtonAddFriend></StyledTableCell>
                                    </StyledTableRow>
                                ) : (<tr key='0'></tr>))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </StyledGrid>
            </React.Fragment>
            <br />
        </div>)
}

export default UserListFriend