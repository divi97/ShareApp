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
import Container from '@material-ui/core/Container'
import styles from './Search.module.css';
import SearchIcon from '@material-ui/icons/Search';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableFooter from '@material-ui/core/TableFooter';
// import IconButton from '@material-ui/core/IconButton';
// import FirstPageIcon from '@material-ui/icons/FirstPage';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import LastPageIcon from '@material-ui/icons/LastPage';


// function TablePaginationActions(props) {
//   const classes = useStyles1();
//   const theme = useTheme();
//   const { count, page, rowsPerPage, onChangePage } = props;

//   const handleFirstPageButtonClick = (event) => {
//     onChangePage(event, 0);
//   };

//   const handleBackButtonClick = (event) => {
//     onChangePage(event, page - 1);
//   };

//   const handleNextButtonClick = (event) => {
//     onChangePage(event, page + 1);
//   };

//   const handleLastPageButtonClick = (event) => {
//     onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };

//   return (
//     <div className={classes.root}>
//       <IconButton
//         onClick={handleFirstPageButtonClick}
//         disabled={page === 0}
//         aria-label="first page"
//       >
//         {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
//         {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//       </IconButton>
//       <IconButton
//         onClick={handleNextButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="next page"
//       >
//         {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//       </IconButton>
//       <IconButton
//         onClick={handleLastPageButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="last page"
//       >
//         {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </div>
//   );
// }

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onChangePage: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };


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



function UserList(props) {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [search, setSearch] = useState(null)
  
  const setBlock  = async (id) => {
    // const list = [...list]
    setList(list.map(e=>{
      if (e.id === id) {
        e.blocked = !e.blocked
      }
      return e
    }))
  }

  const searchSpace = (event) => {
    let keyword = event.target.value;
    setSearch(keyword)
  }
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [bstatus, setbstatus] = useState(false)


  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const fetchData = async () => {
    const res = await axios.get("http://localhost:1234/user/userlist")
    setList(res.data.users)
  }

  useEffect(() => {
    fetchData()
  }, []);

  const blockStateToggler = async (blockedStatus, id) => {
    blockedStatus = !blockedStatus
    await axios.put(`http://localhost:1234/user/updateblocked/${id}`, { blockedStatus: blockedStatus })
    setBlock(id) 
    // fetchData()
  }

  return (
    <div>
      <h1>Users List</h1>
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
                  <StyledTableCell>NAME</StyledTableCell>
                  <StyledTableCell>EMAIL</StyledTableCell>
                  <StyledTableCell>JOINED ON</StyledTableCell>
                  <StyledTableCell>ACCESS STATUS</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  // (rowsPerPage > 0 ? list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : list).map()
                  list.filter((row) => {
                    if (search == null) {
                      return row
                    } else if (row.name.toLowerCase().includes(search.toLowerCase()) || row.email.toLowerCase().includes(search.toLowerCase())) {
                      return row
                    } else {
                      return null
                    }
                  }).map((row, index) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">⇨</StyledTableCell>
                      <StyledTableCell>{row.name}</StyledTableCell>
                      <StyledTableCell>{row.email}</StyledTableCell>
                      <StyledTableCell>{row.createdAt.substring(0, 10)}</StyledTableCell>
                      <StyledTableCell>{row.blocked === false ?
                        (<StyledButtonBlock variant="outlined" type="button" onClick={() => { blockStateToggler(row.blocked, row.id) }}>Block</StyledButtonBlock>) :
                        (<StyledButtonUnBlock variant="outlined" type="button" onClick={() => { blockStateToggler(row.blocked, row.id) }}>Unblock</StyledButtonUnBlock>)}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                {/* {emptyRows > 0 && (<TableRow style={{ height: 53 * emptyRows }}> <TableCell colSpan={6} /></TableRow>)} */}
              </TableBody>
              {/* <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter> */}
            </Table>
          </TableContainer>
        </StyledGrid>
      </React.Fragment>
      <br />
    </div>)
}

export default UserList

////NOTE : Commented items --> Pagination Support