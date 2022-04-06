import React from 'react';
import {useRef, useState, useEffect} from 'react';
import axios from 'axios';

function Register  (){

    const [nameReg, setNameReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const register = (e) => {
        if (nameReg =='' || emailReg == '' || usernameReg =='' || passwordReg ==''){
            alert("Invalid registration. Please fill out every field.")
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
                alert("User created successfully!")
            }
            else{
                alert("Error registering user.")
            }
        });
    }
    };

  return (
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
                  <input type="text" name="password" placeholder='Password'
                  onChange={(e) => {
                  setPasswordReg(e.target.value);
              }}
                  ></input>
                  <br></br>
                  <br></br>
                  <button className='blue-btn' onClick={register}>Register</button>
                  <br></br>
                  <br></br>
                  

          </div>
      </div>
  )
}

export default Register