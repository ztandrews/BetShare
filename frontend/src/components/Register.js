import React from 'react';
import {useRef, useState, useEffect} from 'react';
import axios from 'axios';
import { Navbar, Nav,  Container, Button } from 'react-bootstrap'
import {
    Link, useNavigate
} from "react-router-dom";

function Register  (){

    const [nameReg, setNameReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [alert, setAlert] = useState('');
    const [fontColor, setFontColor] = useState('black')

    const register = (e) => {
        if (nameReg =='' || emailReg == '' || usernameReg =='' || passwordReg ==''){
            setAlert("Invalid registration. Please fill out every field.");
            setFontColor('#dc3545')
        }
        else{
        axios.post("http://localhost:8000/register", {
            name: nameReg,
            email: emailReg,
            username: usernameReg, 
            password: passwordReg,
            wins: 0,
            losses: 0 
        }).then((response) => {
            console.log(response.status);
            const resp = response.status;
            if (resp == 200){
                setAlert("Account created successfully!");
                setFontColor("#5aa864");
            }
            else{
                setAlert("Error registering user.");
                setFontColor('#dc3545')
            }
        });
    }
    };

  return (
      <div>
          <Navbar collapseOnSelect expand="lg" variant="light" bg="light">
              <Container>
                            <Navbar.Brand><h3 className='blue'>BetShare</h3></Navbar.Brand>
                </Container>
          </Navbar>
      
      <div className='container'>
          <h1 className='page-header'>Register</h1>
          <div className='login'>
              <br></br>
              <input type="text" name="name" placeholder='Full Name' 
              onChange={(e) => {
                  setNameReg(e.target.value);
              }}>
              </input>
                  <br></br>
                  <br></br>
              <input type="text" name="email" placeholder='Email'
              onChange={(e) => {
                  setEmailReg(e.target.value);
              }}>
              </input>
                  <br></br>
                  <br></br>
                  <input type="text" name="username" placeholder="Username" 
                  onChange={(e) => {
                  setUsernameReg(e.target.value);
              }}
                  ></input>
                  <br></br>
                  <br></br>
                  <input type="password" name="password" placeholder='Password'
                  onChange={(e) => {
                  setPasswordReg(e.target.value);
              }}
                  ></input>
                  <br></br>
                  <br></br>
                  <button className='blue-btn' onClick={register}>Register</button>
                  <br></br>
                  
                  <Nav.Link as={Link} to={"/"}>Back to Login</Nav.Link>
                  <h5 style={{color: fontColor}}>{alert}</h5>
                  

          </div>
      </div>
      </div>
  )
}

export default Register