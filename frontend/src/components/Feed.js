import React, { Component } from 'react'
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import NavbarComp from './NavbarComp';

export default class Feed extends Component {
        state= {
        bets: [],
        teams: []
    }

    componentDidMount(){
        axios.get("http://127.0.0.1:8000/bets").then(res => {
            const bets = res.data.data;
            console.log(bets);
            this.setState({bets: bets});
        })

        axios.get("http://127.0.0.1:8000/teams").then(res => {
            const teams = res.data.data;
            console.log(teams);
            this.setState({teams:teams});
        })
        
    }

    render() {
        return (
            <div>
                <NavbarComp/>
            <div className = "container">
                <h1 className = "page-header">Feed</h1>
                <h1></h1>
                <div>
                  
                    {
                        this.state.bets.map(bet => {
                            return(
                                <div key={bet.id}>
                                <div className='bet'>
                                <h2 className='blue'>{bet.user.name}</h2>
                                <h5 className='blue'>@{bet.user.username}</h5>
                                <h2>{bet.team_for.city} {bet.team_for.team} {bet.details}</h2>
                                <h5>{bet.team_for.city} {bet.team_for.team} vs. {bet.team_against.city} {bet.team_against.team}</h5>
                                <h5>{bet.odds}</h5>
                                <h5>${bet.amount}</h5>
                                <h5>Status: {bet.outcome}</h5>
                                <h5>Likes: {bet.likes}</h5>
                                <button className='red-btn'>Like</button>
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
