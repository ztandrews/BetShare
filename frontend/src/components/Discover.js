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
                <br></br>
                <div>
                    {
                        this.state.users.map(user => {
                            return(
                                <tr key={user.id}>
                                <h2>{user.name}</h2>
                                <h3>{user.username}</h3>
                                <h3>Record: {user.wins}-{user.losses}</h3>
                                <br></br>
                                </tr>
                            );
                        }
                    )
                    }
                </div>
            </div>
        )
    }
}