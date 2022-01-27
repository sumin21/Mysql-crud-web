import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';

import React, {useState} from 'react';

import Axios from 'axios';
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

function LoginPage(history) {

    const navigate = useNavigate();


    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    
    const onSubmitHandler = (event) =>{
        //변경 없이 submit 클릭 -> 리로드 x
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        Axios.post('/api/users/login', body)//
        .then(function (response) {
            console.log(response.data.login);
            //페이지 이동
            if(response.data.login) navigate("/");

        })
          .catch(function (error) {
            console.log(error);
        });
    }

    const [displayClass, setDisplayClass] = useState('first');

    const onRegisterHandler = (event) => {
        if(displayClass === 'first'){
            setDisplayClass('second')
        }
        else{
            setDisplayClass('first')
        }
        console.log(displayClass)

    }

    const [RegisterFirstName, setRegisterFirstName] = useState("")
    const [RegisterLastName, setRegisterLastName] = useState("")
    const [RegisterEmail, setRegisterEmail] = useState("")
    const [RegisterPassword, setRegisterPassword] = useState("")

    const onRegisterFirstNameHandler = (event) => {
        setRegisterFirstName(event.currentTarget.value)
    }

    const onRegisterLastNameHandler = (event) => {
        setRegisterLastName(event.currentTarget.value)
    }

    const onRegisterEmailHandler = (event) => {
        setRegisterEmail(event.currentTarget.value)
    }

    const onRegisterPasswordHandler = (event) => {
        setRegisterPassword(event.currentTarget.value)
    }

    const onRegisterSubmitHandler = (event) =>{
        //변경 없이 submit 클릭 -> 리로드 x
        event.preventDefault();

        let body = {
            name: RegisterFirstName,
            lastname: RegisterLastName,
            email: RegisterEmail,
            password: RegisterPassword
        }

        Axios.post('/api/users/register', body)//
        .then(function (response) {
            console.log(response.data.success);
            //페이지 이동
            if(response.data.success) {
                setDisplayClass('first');
            }

        })
          .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className="landing-page">
            <div className="container landing-page-margin">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                    <div id="first" className={`${displayClass === 'first' ? 'display-class' : 'nondisplay-class'}`}  >
                        <div className="myform form ">
                            <div className="logo mb-3">
                                <div className="col-md-12 text-center">
                                    <h1 className='login-text'>Studeet</h1>
                                </div>
                            </div>
                        <form action="" method="post" name="login">
                                <div className="form-group email-box">
                                    <label className='email-text'>Email</label>
                                    <input type="email" name="email"  className="form-control" id="login-email" aria-describedby="emailHelp" placeholder="Enter email" value={Email} onChange={onEmailHandler} />
                                </div>
                                <div className="form-group password-box">
                                    <label className='password-text'>Password</label>
                                    <input type="password" name="password" id="login-password"  className="form-control" aria-describedby="emailHelp" placeholder="Enter Password" value={Password} onChange={onPasswordHandler} />
                                </div>
                                <div className="login-btn-box col-md-12 text-center ">
                                    <button type="submit" className=" login-btn btn btn-block btn-primary tx-tfm" onClick={onSubmitHandler} >로그인</button>
                                </div>
                                <div className="col-md-12 ">
                                    <div className="login-or">
                                        <hr className="hr-or"/>
                                        <span className="span-or">or</span>
                                    </div>
                                </div>
                                <div className="register-btn-box col-md-12 text-center ">
                                    <div className=" register-btn btn btn-block btn-outline-secondary" onClick={onRegisterHandler} >Signup</div>
                                </div>
                                <div className="form-group">
                                    <p className="text-center">Don't have account? Sign up here</p>
                                </div>
                                </form>
                        
                        </div>
                    </div>
                    <div id="second" className={`${displayClass === 'second' ? 'display-class' : 'nondisplay-class'}`} >
                        <div className="myform form ">
                                <div className="logo mb-3">
                                <div className="col-md-12 text-center">
                                    <h1 className='login-text'>Signup</h1>
                                </div>
                                </div>
                                <form action="#" name="registration"/>
                                <div className="form-group email-box">
                                    <label className='email-text'>First Name</label>
                                    <input type="text"  name="firstname" className="form-control" id="register-firstname" aria-describedby="emailHelp" placeholder="Enter Firstname" value={RegisterFirstName} onChange={onRegisterFirstNameHandler} />
                                </div>
                                <div className="form-group email-box">
                                    <label className='email-text'>Last Name</label>
                                    <input type="text"  name="lastname" className="form-control" id="register-lastname" aria-describedby="emailHelp" placeholder="Enter Lastname" value={RegisterLastName} onChange={onRegisterLastNameHandler} />
                                </div>
                                <div className="form-group email-box">
                                    <label className='email-text'>Email address</label>
                                    <input type="email" name="email"  className="form-control" id="register-email" aria-describedby="emailHelp" placeholder="Enter email" value={RegisterEmail} onChange={onRegisterEmailHandler} />
                                </div>
                                <div className="form-group email-box">
                                    <label className='email-text'>Password</label>
                                    <input type="password" name="password" id="register-password"  className="form-control" aria-describedby="emailHelp" placeholder="Enter Password" value={RegisterPassword} onChange={onRegisterPasswordHandler} />
                                </div>
                                <div className="register-btn-box col-md-12 text-center mt-4">
                                    <button type="submit" className="login-btn btn btn-block mybtn btn-primary" onClick={onRegisterSubmitHandler}>회원가입 하기</button>
                                </div>
                                <div className="col-md-12 ">
                                    <div className="form-group">
                                        <div className="text-center go-to-login" onClick={onRegisterHandler} >Already have an account?</div>
                                    </div>
                                </div>
                                    </div>
                                
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
