import React, {useEffect} from 'react'

import axios from 'axios';
import { useLocation } from 'react-router-dom';

const MyPage=() => {
    const names = useLocation();

    console.log(names.state.name);

    return (
        <div className='mypage-container'>
            <div>MyPage</div>
            <div>{names.state.name}</div>
            <div>{names.state.email}</div>
        </div>
        
    )
}

export default MyPage