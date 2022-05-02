import React, { Component } from 'react'
import { Navbar, Nav,  Container, Button } from 'react-bootstrap'
import {
    Link
} from "react-router-dom";




export default class NavbarComp extends Component {
    render() {
        return (
                <div>
                    <Navbar collapseOnSelect expand="lg" variant="light" bg="light">
                        <Container>
                            <Navbar.Brand><h3 className='blue'>BetShare</h3></Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                </Nav>
                                <Nav>
                                    <Nav.Link as={Link} to={"/home"}>Feed</Nav.Link>
                                    <Nav.Link as={Link} to={"/account"}>Account</Nav.Link>
                                    <Nav.Link as={Link} to={"/discover"}>Discover</Nav.Link>
                                    <Nav.Link as={Link} to={"/add_bet"}>Add Bet</Nav.Link>
                                    <Nav.Link as={Link} to={"/"}>Logout</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            

        )
    }
}