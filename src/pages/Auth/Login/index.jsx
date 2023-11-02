import React from "react";
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './../../../redux/actions/auth'
import Alert from '../../../components/Alert'
import '../Login/index.css'

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { errorMessage, isError } = useSelector((state) => state.auth)


    const [inputData, setInputData] = useState({
        email: '',
        password: ''

    })
    // let url = import.meta.env.VITE_BASE_URL


    const postData = (e) => {
        e.preventDefault()
        dispatch(login(inputData, navigate))
    }

    const onChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })

    }

    return (

        <div className="container" id="main-body">

            {isError && errorMessage && <Alert type="warning" message={errorMessage} className="alrt23 text-center" />}
            {isError && !errorMessage && <Alert type="warning" message="ada yang salah" />}
            <div className="text-center mt-5">
                <h1>Recipe...</h1>
            </div>
            <div className="text-center mt-5">
                <h1 >Welcome</h1>
            </div>
            <div className="text-center mt-3">
                <p>Log in into your exiting account</p>
            </div>
            <form onSubmit={postData} className='row col-6 gap-2'>
                <section  id="sub-title" className="text-center mt-5 txt1">
                    <div id="title" className="row txt-2">
                       

                            <label>Email</label><br />
                            <input type="email" name='email' value={inputData.email} className='form-control col-4' onChange={onChange} placeholder='email' />
                        
                    </div>
                    <div id="title2" className="m-2 txt-2">
                        <div>

                        <label>Password</label><br />
                        <input type="password" name='password' value={inputData.password} className='form-control col-4' onChange={onChange} placeholder='password' />
                        </div>
                    </div>
                </section>
                <section id="sub-title2" className="text-center txt-5">
                    <div id="title3" className="form-check m-2">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" >
                            I agree to terms & conditions
                        </label>
                    </div>
                    {/* style="text-decoration: none; color: white;" */}
                    <button id="sub-btn" type="submit" className="btn btn-warning nt23"><a className="text-white">Login</a></button>
                    <div className="txt-6">
                        <p>Belum daftar?<Link to={`/register`} className="txt23">sign up</Link></p>
                    </div>

                </section>




            </form>

        </div>
    )
}