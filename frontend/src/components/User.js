import React, { Component } from 'react'
import NavbarComp from './NavbarComp'
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default class User extends Component {

    state = {
        bets: [],
        userData: [],
        followers: 0,
        following: 0,
        is_following: false,
        button_text: "Follow",
        button_class: ""
    }


    componentDidMount(){
        const uid_window = window.location.pathname;
        const uid = uid_window.substring(6);

        const user = localStorage.getItem('user_id');


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

        axios.get(`http://127.0.0.1:8000/user/${user}/following/${uid}`).then(res => {
            const isFollowing = res.data.data;
            console.log("Is following?");
            console.log(isFollowing.toString())
            this.setState({is_following: isFollowing})
            if (isFollowing === true){
                this.setState({button_text:"Following"})
                this.setState({button_class:"btn btn-outline-primary"})
            }
            else{
                this.setState({button_text:"Follow"})
                this.setState({button_class:"btn btn-primary"})
            }
        })

    }



  render() {
    const uid_window = window.location.pathname;
    const uid = uid_window.substring(6);
    const user = localStorage.getItem('user_id');

    const handleFollow = () => {
        if (this.state.is_following == false){
            axios.post(`http://127.0.0.1:8000/user/${user}/add/following/${uid}`)
            axios.post(`http://127.0.0.1:8000/user/${uid}/add/follower/${user}`)
            window.location.reload();
        }
        else{
            axios.post(`http://127.0.0.1:8000/user/${user}/remove/following/${uid}`)
            axios.post(`http://127.0.0.1:8000/user/${uid}/remove/follower/${user}`)
            window.location.reload();
        }
    }

    return (
        <div>
            <NavbarComp/>
      <div className='container'>
          <h1 className='page-header'>{this.state.userData.name}</h1>
          <h1 className='page-subheader'>@{this.state.userData.username}</h1>
          <h5 className='page-subheader'>Followers: {this.state.followers} Following: {this.state.following}</h5>
          <center><button className={this.state.button_class} onClick={() => handleFollow()}>{this.state.button_text}</button></center>
          <br></br>
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
