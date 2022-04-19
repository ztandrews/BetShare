import React, { Component } from 'react'
import axios from 'axios';
import NavbarComp from './NavbarComp';
import { Navbar, Nav,  Container, Button } from 'react-bootstrap'
import {
    Link, useNavigate
} from "react-router-dom";


export default class Discover extends Component {
    state= {
        users: []
    }
    

    componentDidMount(){
        axios.get("http://127.0.0.1:8000/users").then(res => {
            const users = res.data.data;
            console.log(users);
            this.setState({users: users});
        })
    }


    render() {
        return (
            <div>
                <NavbarComp />
            <div className = "container">
                <h1 className = "page-header">Discover</h1>
                <input placeholder="Search for a user" className='search'></input>
                <br></br>
                <br></br>
                <div>
                    {
                        this.state.users.map(user => {
                            return(
                                <div key={user.id}>
                                <div className='bet'>
                                <h2><Nav.Link as={Link} to={"/user/"+user.id}>{user.name}</Nav.Link></h2>
                                <h2><Nav.Link as={Link} to={"/user/"+user.id}>@{user.username}</Nav.Link></h2>
                                </div>
                                <br></br>
                                </div>
                            );
                        }
                    )
                    }
                </div>
            </div>
            </div>
        )
    }
}