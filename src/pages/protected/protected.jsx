import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/loading';
import axios from 'axios';
import Cookies from 'js-cookie'
const Protected=()=> {
    const [status, setStatus] = useState('LOADING');
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
                setStatus('VARIFIED');
                return;
            }
        }).catch(err=>{
            navigate('/');
            return;
        })
    },[])
    if(status==='LODAING')return (<Loading/>)
    
    return (
        <Outlet/>
    )
}

export default Protected