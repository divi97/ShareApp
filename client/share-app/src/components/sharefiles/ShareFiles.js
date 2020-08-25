import React, { useEffect } from 'react'

function ShareFiles (props) {

    useEffect(() => {
        document.title = "Share Files"
    })


    return (
        <>
        <h1 style={{ fontWeight: 'bold' }}>Share Files</h1>
        </>
    )
}

export default ShareFiles