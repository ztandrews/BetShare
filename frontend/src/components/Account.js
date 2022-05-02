import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import NavbarComp from './NavbarComp';

export default class Account extends Component {
    state= {
        userData: [],
        bets: [],
        show: false,
        setShow: false,
        currentBetId: '',
        currentBetFor: '',
        currentBetDetails: '',
        currentBetStatus: '',
        followers: 0,
        following: 0
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
            let followerCount = 0;
           for (const follower of currentUser.followers){
               followerCount += 1;
           }
           this.setState({followers: followerCount});

           let followingCount = 0;
           for (const following of currentUser.following){
               followingCount += 1;
           }
           this.setState({following: followingCount});
        })
    }
    
    render() {
        const handleClose = () => {
            this.setState({show: false});
        }
        const updateStatus = (_id, tfor, bdetails, bstatus) =>{
            this.setState({currentBetId: _id});
            this.setState({currentBetFor: tfor});
            this.setState({currentBetDetails: bdetails});
            this.setState({currentBetStatus: bstatus})
            this.setState({show: true});
        }

        const updateBetStatus = (_id, outcome) => {
            console.log(_id);
            console.log(outcome);
            axios.put(`http://127.0.0.1:8000/status/${_id}/${outcome}`).then(res => {
                console.log(res);
                this.setState({show: false});
                window.location.reload();
            })
        }

        const deleteBet = (_id) => {
            console.log(_id);
            axios.delete(`http://127.0.0.1:8000/bets/${_id}`).then(res => {
                this.setState({show: false});
                window.location.reload();
            }
            )
        }

        return (
            <div>
                <NavbarComp />
            <div className = "container">
            <h1 className = "page-header">{this.state.userData.name}</h1>
            <h2 className='page-subheader'>@{this.state.userData.username}</h2>
            <h5 className='page-subheader'>Followers: {this.state.followers} Following: {this.state.following}</h5>
                <Modal show={this.state.show} onHide={handleClose}>
                <Modal.Header closeButton>
          <Modal.Title>Update Bet Status</Modal.Title>
        </Modal.Header>
                 <Modal.Body>
                     <h5>{this.state.currentBetFor} {this.state.currentBetDetails}</h5>
                     <h6>Current Status: {this.state.currentBetStatus}</h6>
                     <Button className='btn btn-success' onClick = {() => updateBetStatus(this.state.currentBetId, "Win")}>Win</Button>
                     <br></br>
                     <br></br>
                    <Button className='btn btn-danger' onClick = {() => updateBetStatus(this.state.currentBetId, "Loss")}>Loss</Button>
                    <hr></hr>
                    <button className = 'btn btn-outline-danger' onClick = {() => deleteBet(this.state.currentBetId)}>Delete Bet</button>
                  </Modal.Body>
            </Modal>
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
                                <button className='blue-btn' onClick={() => updateStatus(bet.id, bet.team_for.team, bet.details, bet.outcome)}>Update Status</button>
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
