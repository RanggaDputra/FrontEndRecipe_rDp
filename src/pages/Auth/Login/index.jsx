import React from "react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {login}  from './../../../redux/actions/auth'
import Alert from '../../../components/Alert'

export default function Login(){
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {errorMessage,isError} = useSelector((state)=>state.auth)


    const [inputData,setInputData] = useState({
        email:'',
        password:''
        
    })
    // let url = import.meta.env.VITE_BASE_URL
    

    const postData = (e) =>{
        e.preventDefault()
        dispatch(login(inputData,navigate))
    }

    const onChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
        
    }

    return(
        
        <div className="container">
             <form onSubmit={postData} className='row col-6 gap-2'>
             <input type="email" name='email' value={inputData.email} className='form-control col-4' onChange={onChange} placeholder='email' />
             <input type="password" name='password' value={inputData.password} className='form-control col-4' onChange={onChange} placeholder='password' />
             <button type="submit" className="btn btn-warning">Login</button>

             {isError && errorMessage && <Alert type="warning" message={errorMessage} />}
         {isError && !errorMessage && <Alert type="warning" message="ada yang salah" />}
             </form>
        </div>
    )
}