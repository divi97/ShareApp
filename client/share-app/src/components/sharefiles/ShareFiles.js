import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import { Table, TableBody, TableRow, TableCell, TableContainer, TableHead} from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import ShareIcon from '@material-ui/icons/Share';

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

const StyledButtonShare = withStyles(() => ({
    root: {
        borderColor: '#000',
        backgroundColor: '#000',
        '&:hover': {
            backgroundColor: '#009432'
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

function ShareFiles(props) {
    const classes = useStyles()
    const [list, setList] = useState([])
    const [multiuploads, setMultiUploads] = useState([])

    const fetchData = async () => {
        const userid = localStorage.getItem("id")
        const res = await axios.post('http://localhost:1234/file/getuploadedfiles', { id: userid })
        setList(res.data.filelist)
        // console.log(res.data.filelist)
    }

    useEffect(() => {
        document.title = "Share Files"
        fetchData()
    }, [])

    const handleUploads = (event) => {
        if (event.target.files.length > 0)
            setMultiUploads(event.target.files)
    }

    const handleSubmit = async () => {
        const fd = new FormData()
        const id = localStorage.getItem('id')
        for (let file of multiuploads) {
            fd.append('files', file)
        }
        const res = await axios.post(`http://localhost:1234/file/uploadfiles/${id}`, fd)
        alert(res.data.msg)
        fetchData()
    }

    const shareFile = async (id) => {
        const promptEmail = prompt("Enter email you want to share with")
        if(promptEmail !== null && promptEmail !== ''){
            const from = localStorage.getItem('id')
            const fileid = id
            console.log(promptEmail, from, fileid)
            //axios post call for file share {from:from, fileid:id, to: promptEmail}
        } else {
            console.log("Email not entered")
        }
    }

    return (
        <>
            <Container>
                <h1>Share Files</h1>
                <hr style={{ width: '80%' }} />
                <div>
                    <h3>Upload Files to drive</h3>
                    <div style={{ marginBottom: '2%' }}>
                        <input type="file" name="files" multiple onChange={handleUploads}></input>
                    </div>
                    <Button type="button" variant="contained" onClick={handleSubmit}>Upload</Button>
                    <div>
                        List of Flies being uploaded with a X button
                    </div>
                </div>
                <hr style={{ width: '80%' }} />
                <div>
                    <h1>File List</h1>

                    <br />
            <React.Fragment>
                <StyledGrid item md={8}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell></StyledTableCell>
                                    <StyledTableCell>PREVIEW</StyledTableCell>
                                    <StyledTableCell>FILE NAME</StyledTableCell>
                                    <StyledTableCell>SHARE FILE</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list.map((row, index) => row.id !== localStorage.getItem("id") ? (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell component="th" scope="row">⇨</StyledTableCell>
                                        <StyledTableCell><Avatar className={classes.image} alt="" src={`http://localhost:1234/${row.filepath}`} /></StyledTableCell>
                                        <StyledTableCell>{row.filename}</StyledTableCell>
                                        <StyledTableCell><StyledButtonShare variant="contained" type="button" onClick={() => shareFile(row.id)} ><ShareIcon style={{color: '#fff'}}/></StyledButtonShare></StyledTableCell>
                                    </StyledTableRow>
                                ) : (<tr key='0'></tr>))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </StyledGrid>
            </React.Fragment>
            <br />
                </div>
            </Container>
        </>
    )
}

export default ShareFiles