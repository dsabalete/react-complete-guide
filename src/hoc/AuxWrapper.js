import React from 'react'

const AuxWrapper = props => (
    <div className={props.className}>
        {props.children}
    </div>
)

export default AuxWrapper