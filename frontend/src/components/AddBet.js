import React, { Component } from 'react'
import axios from 'axios';

import NavbarComp from './NavbarComp';

export default class AddBet extends Component {
        state= {
        teams: [],
        team_for: '',
        team_against: '',
        type: '',
        amount: '',
        odds: '',
    }


    componentDidMount(){
            axios.get("http://127.0.0.1:8000/teams").then(res => {
            const teams = res.data.data;
            console.log(teams);
            this.setState({teams:teams});
        })
        
    }

    handleSubmit = event => {
        const current_user = localStorage.getItem('user_id')
        const current_date = new Date()
        axios.post('http://127.0.0.1:8000/bets', {         
        user: current_user,
        team_for: this.state.team_for,
        team_against: this.state.team_against,
        details: this.state.type,
        amount: this.state.amount,
        odds: this.state.odds,
        date: current_date,
        likes: 0,
        outcome: "Pending"}).then(
            res=>{
                console.log(res);
                console.log(res.data);
            }
        )

    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
        console.log("Change");
    }

    render() {
        const {team_for, team_against, type, amount, odds} = this.state;
        return (
            <div>
                <NavbarComp />
            <div className = "container">
                <h1 className = "page-header">Add Bet</h1>
                <div className='login'>
                <form onSubmit = {this.handleSubmit} >

                    <h3>Team For</h3>
                    <select name="team_for" value={team_for} onChange={this.handleChange}>
                        {this.state.teams.map((team) => (
                            <option value = {team.id}>{team.city} {team.team}</option>
                        ))}
                    </select>

                    <h3>Team Against</h3>
                    <select name = "team_against" value = {team_against} onChange={this.handleChange}>
                        {this.state.teams.map((team) => (
                            <option value = {team.id}>{team.city} {team.team}</option>
                        ))}
                    </select>

                    <h3>Wager Type</h3>
                    <input type="text" name="type" value={type} onChange={this.handleChange}></input>

                    <h3>Wager Amount</h3>
                    <input type="text" name="amount" value = {amount} onChange={this.handleChange}></input>

                    <h3>Odds</h3>
                    <input type="text" name="odds" value = {odds} onChange={this.handleChange}></input>

                    <br></br>
                    <br></br>
                    <button className='blue-btn'>Submit</button>
                </form>  
                </div> 
            </div>
            </div>
        )
    }
}
