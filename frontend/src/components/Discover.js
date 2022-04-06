import React, { Component } from 'react'
import axios from 'axios';

import NavbarComp from './NavbarComp';

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
                <input placeholder="Enter Username"></input>
                <br></br>
                <div>
                    {
                        this.state.users.map(user => {
                            return(
                                <div key={user.id}>
                                <h2>{user.name}</h2>
                                <h3>{user.username}</h3>
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