import React from 'react'
import NavComponent from './NavComponent'
import Tab from 'react-bootstrap/Tab'
import Join from './Players/Join'
import Host from './Host/Host'
import Button from './Button'

const Navbar = () => {
    return (
        <NavComponent>
            <Tab eventKey="home" title="JOIN" tabClassName = {'tabs'}>
                <Join />
            </Tab>
            <Tab eventKey="profile" title="HOST" tabClassName = {'tabs'}>
                <Host />
            </Tab>
        </NavComponent>
    )
}

export default Navbar
