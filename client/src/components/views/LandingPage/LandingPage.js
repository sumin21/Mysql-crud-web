import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css';

import React, {useEffect} from 'react'

import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    // 랜딩페이지에 들어오자마자 실행됨
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => {
            console.log(response.data)
        })
    }, [])

    
    const onClickHandler = () => {
        axios.get(`/api/users/logout`)
            .then(response => {
                if (response.data.success) {
                    navigate("/login");
                } else {
                    alert('로그아웃 하는데 실패 했습니다.')
                }
            })
    }
    const onMyPageHandler = () => {
        axios.get(`/api/users/mypage`)
            .then(response => {
                if (response.data.success) {
                    navigate("/mypage", {state:{name:response.data.name, email:response.data.email}});
                } else {
                    alert('회원 정보를 불러오는 데에 실패 했습니다.')
                }
            })
    }


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>
            <Button onClick={onMyPageHandler} >
                MyPage
            </Button>

            <Button onClick={onClickHandler} >
                로그아웃
            </Button>

        </div>
        
    )
}

export default LandingPage
