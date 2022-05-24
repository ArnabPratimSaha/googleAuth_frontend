import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/button/Button';
import { AiOutlineGoogle } from 'react-icons/ai';
import './auth.css';
const Auth=({})=> {
    const [user, setUser] = useState('LOADING');
    const navigate=useNavigate();

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
            navigate('NOT_FOUND');
            return;
        })
    },[])
  return (
    <div className='auth-fulldiv'>
        <div className="auth-buttons">
            <Button className={'btn-google'} onClick={()=>window.location='http://localhost:5000/auth'}>Sign in as <AiOutlineGoogle className='google-icon'/>  Account</Button>
            {user!=='LOADING' && user!=='NOT_FOUND' && <div className='user-info'>
                <span>Signed in as</span> 
                <span>{user.name}</span> 
                <Button className={'user-button'} onClick={()=>navigate('/profile')}>Profile</Button>
            </div> }
        </div>

    </div>
  )
}

export default Auth