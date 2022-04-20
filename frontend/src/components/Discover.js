import React, { Component, useState, useEffect, useRef } from 'react'
import axios from 'axios';
import NavbarComp from './NavbarComp';
import { Navbar, Nav,  Container, Button} from 'react-bootstrap'
import {
    Link, useNavigate
} from "react-router-dom";

function Discover() {

    const [all_users, setUsers] = useState([]);
    
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/users").then(res => {
        const users = res.data.data;
        console.log(users);
        setUsers(users);
    })},[]);

  return (
    <div>
        <NavbarComp />
        <div className = "container">
            <h1 className = "page-header">Discover</h1>
                <input placeholder="Search for a user" className='search' onChange={event => setSearchTerm(event.target.value)}></input>
                <br></br>
                <br></br>
                <div>
                    {
                        all_users.filter((user)=> {
                            if (searchTerm === ''){
                                return user
                            }
                            else if (user.username.toLowerCase().includes(searchTerm.toLowerCase())){
                                return user
                            }
                        }).map(user => {
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

export default Discover