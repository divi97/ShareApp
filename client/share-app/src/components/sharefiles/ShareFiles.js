import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'


function ShareFiles(props) {

    useEffect(() => {
        document.title = "Share Files"
    })


    return (
        <>
            <Container>
                <h1 style={{ fontWeight: 'bold' }}>Share Files</h1>
                <hr style={{ width: '80%' }} />
                <div>
                    <h3>Upload Files to drive</h3>
                    <input type="file" name="files" multiple></input><br></br>
                    <button>Upload</button>
                </div>
                <div>
                    <h3>File List</h3>
                    <h5>(Card type style have a share button on which a modal opens to asks to enter email of receiver and a share button)</h5>
                </div>
                <div>
                    <h3>Modal</h3>
                    <h5>(Req* input(email) and share button)</h5>
                </div>
            </Container>
        </>
    )
}

export default ShareFiles