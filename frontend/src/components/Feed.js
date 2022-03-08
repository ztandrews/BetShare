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
                                <tr key={bet.id}>
        
                                <h2>{bet.team_for} - {bet.details}</h2>
                                <h3>{bet.odds}</h3>
                                <h3></h3>
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
