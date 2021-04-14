import React from 'react'
import PackageRequestItem from './PackageRequestItem/PackageRequestItem'

const PackageRequestViewer = (props) =>{
    const toRender = props.request.map(req =>{
        return(
            <PackageRequestItem request={req} key={req.id} update={props.update}/>
        )
    })

    return(
        <div>
            {toRender}
        </div>
    )
}

export default PackageRequestViewer;