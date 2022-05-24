import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/loading/loading';
import Cookies from 'js-cookie';

import './profile.css';
import Button from '../../components/button/Button';
const Profile=()=> {
    const navigate=useNavigate();
    const [user, setUser] = useState('LOADING')
    useEffect(()=>{
        const id=Cookies.get('id');
        const accesstoken=Cookies.get('accesstoken');
        const refreshtoken=Cookies.get('refreshtoken');
        if(!id||!accesstoken||!refreshtoken){
            navigate('/');
            return;
        }
        axios({method:'get',headers:{id,accesstoken,refreshtoken},url:`${process.env.REACT_APP_BACKEND}/user` }).then(res=>{
            const data=res.data;
            if(res.status===200){
                Cookies.set('accesstoken',data.accesstoken,{expires:100});
                setUser(data);
                return;
            }
        }).catch(err=>{
            navigate('/');
            return;
        })
    },[])
    const handleLogout=async()=>{
        try {
            const id=Cookies.get('id');
            const accesstoken=Cookies.get('accesstoken');
            const refreshtoken=Cookies.get('refreshtoken');
            const res = await axios({ method: 'get', headers: { id, accesstoken, refreshtoken }, url: `${process.env.REACT_APP_BACKEND}/user` })
            if (res.status === 200) {
                Cookies.remove('id')
                Cookies.remove('accesstoken')
                Cookies.remove('refreshtoken')
                return navigate('/')
            }
            return navigate('/')
            
        } catch (error) {
            return navigate('/')
            
        }
    }
    if(user=='LOADING')return(<Loading/>)
  return (
    <div className='profile-fulldiv'>
        <div className="profile-buttons">
            <Button className={'signin-btn'} onClick={()=>navigate('/')}>Sign in</Button>
            <Button className={'logout-btn'} onClick={handleLogout}>Logout</Button>
        </div>
        <div className="user-info-div">
            <img src={user.avatar}/>
            <span>{user.name}</span>
            <p>{user.email}</p>
        </div>
    </div>
  )
}

export default Profile