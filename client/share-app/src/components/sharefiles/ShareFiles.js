import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { Table, TableBody, TableRow, TableCell, TableContainer} from '@material-ui/core'
import Paper from '@material-ui/core/Paper';

function ShareFiles(props) {
    // const classes = useStyles()
    const [list, setList] = useState([])
    const [multiuploads, setMultiUploads] = useState([])

    const fetchData = async () => {
        const userid = localStorage.getItem("id")
        const res = await axios.post('http://localhost:1234/file/getuploadedfiles', { id: userid })
        setList(res.data.filelist)
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
                    <h5>Table with a share icon to pop open a prompt</h5>
                    <TableContainer component={Paper}>
                        <Table ariia-label="customized table">
                            <TableBody>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>FILE NAME</TableCell>
                                    <TableCell>SHARE</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Container>
        </>
    )
}

export default ShareFiles