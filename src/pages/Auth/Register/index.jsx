import React from "react";
import axios from "axios";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { register } from "../../../redux/actions/auth";
import Alert from "../../../components/Alert"
import '../Login/index.css'


export default function Register() {
    const { menu, delete_menu } = useSelector((state) => state)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [photo, setPhoto] = useState(null)
    const [inputData, setInputData] = useState({
        email: "",
        password: "",
        username: "",
        photo_url: ""
    })

    const postData = (event) => {
        event.preventDefault()
        let BodyformData = new FormData()
        BodyformData.append("email", inputData.email)
        BodyformData.append("password", inputData.password)
        BodyformData.append("username", inputData.username)
        BodyformData.append("photo", photo)

        console.log(BodyformData)

        dispatch(register(BodyformData,navigate))

    }
    const onChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
        console.log(inputData)
    }
    const onChangePhoto = (e) => {
        setPhoto(e.target.files[0])
        e.target.files[0] && setInputData({ ...inputData, photo_url: URL.createObjectURL(e.target.files[0]) })
        console.log(e.target.files)
    }

    return (
        <div className="container">

<div className="text-center mt-5">
            <h1>Recipe...</h1>
        </div>
        <div className="text-center mt-5">
            <h1>Let’s Get Started !</h1>
        </div>
        <div className="text-center mt-5">
            <p>Create new account to access all features</p>
        </div>
            <form onSubmit={postData} className='row col-6 gap-2'>

            <section className="text-center mt-5 txt1">
            <div className="m-2 txt-2">
                <label>name</label><br/>
                <input type="text" name='username' value={inputData.username} className='form-control col-4' onChange={onChange} placeholder='username' />
            </div>
            <div className="m-2 txt-2">
                <label>Email</label><br/>
                <input type="email" name='email' value={inputData.email} className='form-control col-4' onChange={onChange} placeholder='email' />
            </div>
            <div className="m-2 txt-2">
                <label>Password</label><br/>
                <input type="password" name='password' value={inputData.password} className='form-control col-4' onChange={onChange} placeholder='password' />
            </div>
            <div className="m-2 txt-2">
                <label>Photo</label><br/>
                <input type="file" name='photo' className='form-control col-4' onChange={onChangePhoto} placeholder='photo' />
                {
                    photo && <img src={inputData.photo_url} width={200} />
                }
            </div>
        </section>
        <section className="text-center txt-5">
            <div className="form-check m-2">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                <label className="form-check-label">
                    I agree to terms & conditions
                </label>
            </div>
            <button type="button" className="btn btn-warning text-white nt23" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Register
</button>


<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Caution</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        harap verifikasi di Gmail ya
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-warning">register</button>
      </div>
    </div>
  </div>
</div>
            <div className="txt-6">
                <p>Already have account? <span><a href="/login">Log in Here</a></span></p>
            </div>

        </section>

                
                
                
               

                

                


            </form>
            
            {/* {!delete_menu.isError &&
                    <Alert type="primary" message="berhasil delete menu" />
                } */}

        </div>
    )
}