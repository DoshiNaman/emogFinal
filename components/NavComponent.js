import React from 'react'
import Tabs from 'react-bootstrap/Tabs'

const NavComponent = props => {
    return (
        <Tabs defaultActiveKey={props.ekey} id="uncontrolled-tab-example" className="mb-3">
            {props.children}
        </Tabs>
    )
}

export default NavComponent
