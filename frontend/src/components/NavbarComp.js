import React, { Component } from 'react'
import { Navbar, Nav,  Container, Button } from 'react-bootstrap'
import {
    Link
} from "react-router-dom";




export default class NavbarComp extends Component {
    render() {
        return (
                <div>
                    <Navbar collapseOnSelect expand="lg">
                        <Container>
                            <Navbar.Brand><h3 className='logo'>BetShare</h3></Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                </Nav>
                                <Nav>
                                    <Nav.Link as={Link} to={"/"}>Feed</Nav.Link>
                                    <Nav.Link as={Link} to={"/account"}>Account</Nav.Link>
                                    <Nav.Link as={Link} to={"/discover"}>Discover</Nav.Link>
                                    <button className='logout'>Logout</button>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            

        )
    }
}