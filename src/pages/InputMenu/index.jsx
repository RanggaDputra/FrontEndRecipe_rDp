import React from "react";
import axios from "axios";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import Navbar from "../../components/navbar"
import Footer from "../../components/Footer"
import { postMenu } from './../../redux/actions/menu'
import { useDispatch, useSelector } from "react-redux"
import '../menuById/index.css'

export default function InputMenu() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [photo, setPhoto] = useState(null)
    const [inputData, setInputData] = useState({
        title: "",
        ingredients: "",
        category_id: "",
        photo_url: ""
    })

    const postData = (event) => {
        event.preventDefault()
        let BodyformData = new FormData()
        BodyformData.append("title", inputData.title)
        BodyformData.append("ingredients", inputData.ingredients)
        BodyformData.append("category_id", inputData.category_id)
        BodyformData.append("photo", photo)

        console.log(BodyformData)

        dispatch(postMenu(BodyformData,navigate))

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
            <Navbar/>
            <h3>Input Menu</h3>
            <form onSubmit={postData} className='row col-6 gap-2'>
                <div className="subs-input">
                <input type="text" name='title' value={inputData.title} className='form-control col-4' onChange={onChange} placeholder='title' />
                <input type="text" name='ingredients' value={inputData.ingredients} className='form-control col-4' onChange={onChange} placeholder='ingredients' />
                <input type="text" name='category_id' value={inputData.category_id} className='form-control col-4' onChange={onChange} placeholder='category' />
                <input type="file" name='photo' className='form-control col-4' onChange={onChangePhoto} placeholder='photo' />
                </div>

                {
                    photo && <img src={inputData.photo_url} width={200} />
                }
                <button type="submit" className="btn btn-warning">Post data</button>

            </form>
            <Footer/>
        </div>
    )
}