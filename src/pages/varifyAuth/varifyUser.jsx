import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/loading/loading';
import axios from 'axios';
import Cookies from 'js-cookie'
function VarifyUser() {
    const {id,at,rt}=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        if(!id||!at||!rt)return navigate('/auth');
        axios({
            method:'get',
            url:`${process.env.REACT_APP_BACKEND}/user`,
            headers:{id,accesstoken:at,refreshtoken:rt}
    
        }).then((res)=>{
            if(res.status===200){
                Cookies.set('id',id,{expires:100});
                Cookies.set('accesstoken',at,{expires:100});
                Cookies.set('refreshtoken',rt,{expires:100});
                navigate('/profile');
                return;
            }
        }).catch(err=>{
            navigate('/');
            return;
        })
    })
  return (
    <div></div>
  )
}

export default VarifyUser