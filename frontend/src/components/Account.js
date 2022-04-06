import React, { Component } from 'react';
import axios from 'axios';

import NavbarComp from './NavbarComp';

export default class Account extends Component {
    state= {
        userData: [],
        bets: []
    }

        componentDidMount(){
        const user = localStorage.getItem('user_id')
        axios.get(`http://127.0.0.1:8000/bets/${user}`).then(res => {
            const bets = res.data.data;
           
            this.setState({bets: bets});
        })

        axios.get(`http://127.0.0.1:8000/users/${user}`).then(res => {
            const currentUser = res.data.data[0];
            console.log(currentUser)
            this.setState({userData: currentUser})
        })
    }


    
    render() {
        return (
            <div>
                <NavbarComp />
            <div className = "container">
            <h1 className = "page-header">{this.state.userData.name}</h1>
            <h2 className='page-subheader'>@{this.state.userData.username}</h2>
                <h1>Recent Bets</h1>
                {
                        this.state.bets.map(bet => {
                            return(
                                <div key={bet.id}>
                                <div className='bet'>
                                <h2>{bet.team_for.city} {bet.team_for.team} {bet.details}</h2>
                                <h5>{bet.team_for.city} {bet.team_for.team} vs. {bet.team_against.city} {bet.team_against.team}</h5>
                                <h5>{bet.odds}</h5>
                                <h5>${bet.amount}</h5>
                                <h5>Status: {bet.outcome}</h5>
                                <h5>Likes: {bet.likes}</h5>
                                <button className='red-btn'>Like</button>
                                <br></br>
                                <br></br>
                                <button className='blue-btn'>Update Status</button>
                                </div>
                                <br></br>
                                </div>
                            );
                        }
                    )
                    }     
            </div>
            </div>
        )
    }
}
