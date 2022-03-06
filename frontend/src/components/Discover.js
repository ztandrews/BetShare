import React, { Component } from 'react'
import axios from 'axios';

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
            <div className = "container">
                <h1 className = "page-header">Discover</h1>
                <ul>
                    {
                        this.state.users
                        .map(user => 
                            <li key={user.id}>{user.name}</li>
                            )
                    }
                </ul>
            </div>
        )
    }
}