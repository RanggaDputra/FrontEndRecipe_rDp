import React from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer"
import '../menuById/index.css'
import { getProfilDetailById,getProfilDetail} from './../../redux/actions/menu'
import { useDispatch, useSelector } from "react-redux"


export default function Profil() {
    const dispatch = useDispatch()
    const {data} = useSelector((state)=>state.detail_menu)
    const navigate = useNavigate()
    const { menuId } = useParams()
    const [photo, setPhoto] = useState(null)
    const [inputData, setInputData] = useState({
        email: "",
        // password: "",
        username: "",
        photo_url: ""
    })

    // const getData = () => {
    //     axios.get(`http://localhost:3000/recipe/${menuId}`, { headers: { Authorization: `Bearer ${token}` } })
    //         .then((res) => {
    //             console.log(res)
    //             setInputData({ ...inputData, title: res.data.data.title, ingredients: res.data.data.ingredients, photo_url: res.data.data.photo })

    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }


    useEffect(() => {
        console.log(menuId)
        dispatch(getProfilDetail(menuId))
        // dispatch(getProfilDetailById(menuId))
        
    }, [])

    useEffect(()=>{
        data && setInputData({...inputData,email:data.email,photo_url:data.photo,username:data.username})
    },[data])

    const postData = (event) => {
        event.preventDefault()
        let BodyformData = new FormData()
        BodyformData.append("email", inputData.email)
        BodyformData.append("password", inputData.password)
        BodyformData.append("username", inputData.username)
        BodyformData.append("photo", photo)

        console.log(BodyformData)



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
            <Navbar />
            <div className="sub-title">
                <span className="navbar-text">
                    <i className="fa-solid fa-user"><span>ayudia</span></i>
                </span>
                <p>21 February 2023<br /><span>20 Likes - 2 Comments</span></p>

            </div>
            <form onSubmit={postData} className='row col-6 gap-2'>
                <h1>{inputData.username}</h1>
                <img src={inputData.photo_url} width={200} />
                {/* <input type="text" name='title' value={inputData.title} className='form-control col-4' onChange={onChange} placeholder='title' /> */}
                <h3>Ingredients</h3>
                <p>{inputData.email}</p>
                {/* <input type="text" name='ingredients' value={inputData.ingredients} className='form-control col-4' onChange={onChange} placeholder='ingredients' /> */}
                {/* <input type="file" name='photo' className='form-control col-4' onChange={onChangePhoto} placeholder='photo' /> */}




                {/* <button type="submit" className="btn btn-warning">Update menu</button> */}


            </form>
            <Footer />
        </div>
    )
}