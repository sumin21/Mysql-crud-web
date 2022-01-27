import React, {useEffect} from 'react'

import axios from 'axios';
import { useLocation } from 'react-router-dom';

const MyPage=() => {
    const names = useLocation();

    console.log(names);

    return (
        <div className='mypage-container'>
            <div>MyPage</div>
            {/* <div></div> */}
        </div>
        
    )
}

export default MyPage
