import React, { Component } from 'react'
import NavbarComp from './NavbarComp'
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default class User extends Component {

    state = {
        bets: [],
        userData: [],
        followers: 0,
        following: 0
    }


    componentDidMount(){
        const uid_window = window.location.pathname;
        const uid = uid_window.substring(6);
        axios.get(`http://127.0.0.1:8000/bets/${uid}`).then(res => {
            const bets = res.data.data;
            this.setState({bets: bets});
        })

        axios.get(`http://127.0.0.1:8000/users/${uid}`).then(res => {
           const user = res.data.data[0];
           this.setState({userData: user})
           let followerCount = 0;
           for (const follower of user.followers){
               followerCount += 1;
           }
           this.setState({followers: followerCount});

           let followingCount = 0;
           for (const following of user.following){
               followingCount += 1;
           }
           this.setState({following: followingCount});
        })
    }



  render() {
    const uid_window = window.location.pathname;
    const uid = uid_window.substring(6);
  
    return (
        <div>
            <NavbarComp/>
      <div className='container'>
          <h1 className='page-header'>{this.state.userData.name}</h1>
          <h1 className='page-subheader'>@{this.state.userData.username}</h1>
          <h5 className='page-subheader'>Followers: {this.state.followers} Following: {this.state.following}</h5>
          <center><Button>Follow</Button></center>
          {
                        this.state.bets.map(bet => {
                            return(
                                <div key={bet.id}>
                                <div className='bet'>
                                <h2 className='blue'>{bet.user_data.name}</h2>
                                <h5 className='blue'>@{bet.user_data.username}</h5>
                                <h2>{bet.team_for.city} {bet.team_for.team} {bet.details}</h2>
                                <h5>{bet.team_for.city} {bet.team_for.team} vs. {bet.team_against.city} {bet.team_against.team}</h5>
                                <h5>Date: {bet.date.substring(0,10)}</h5>
                                <h5>{bet.odds}</h5>
                                <h5>${bet.amount}</h5>
                                <h5>Status: {bet.outcome}</h5>
                                <h5>Likes: {bet.likes}</h5>
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
