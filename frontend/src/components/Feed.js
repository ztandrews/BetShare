import React, { Component } from 'react'
import axios from 'axios';

export default class Feed extends Component {
        state= {
        bets: []
    }

    componentDidMount(){
        axios.get("http://127.0.0.1:8000/bets").then(res => {
            const bets = res.data.data;
            console.log(bets);
            this.setState({bets: bets});
        })
    }
    render() {
        return (
            <div className = "container">
                <h1 className = "page-header">Feed</h1>
               
                <div>
                    {
                        this.state.bets.map(bet => {
                           
                            return(
                                <div key={bet.id}>
                                <div className='bet'>
                                <h2>{bet.user.name}</h2>
                                <h5>@{bet.user.username}</h5>
                                <hr></hr>
                                <h2>{bet.team_for.city} {bet.team_for.team} {bet.details}</h2>
                                <h5>{bet.odds}</h5>
                                <h5>${bet.amount}</h5>
                                <h5>Status: {bet.outcome}</h5>
                                
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
