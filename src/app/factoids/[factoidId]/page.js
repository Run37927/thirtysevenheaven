import React from 'react'

function page({ params }) {
    const factoidId = params.factoidId;
    return (
        <div>factoid details
            <h1>{factoidId}</h1>
        </div>
    )
}

export default page