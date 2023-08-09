import React from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer"
import '../menuById/index.css'

let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJhZGl0IiwiZW1haWwiOiJhZGl0QGFkbWluLmlkIiwicGhvdG8iOm51bGwsImNyZWF0ZWRfYXQiOiIyMDIzLTA3LTI1VDA5OjA5OjQ4Ljk4OVoiLCJyb2xlIjpudWxsLCJpYXQiOjE2OTE0MTQwNzV9.kZCeHLdfUPS8okS6ntFA7HZJ6lAb13sTkths5CEWsVM`

export default function DetailMenu() {
    const navigate = useNavigate()
    const { menuId } = useParams()
    const [photo, setPhoto] = useState(null)
    const [inputData, setInputData] = useState({
        title: "",
        ingredients: "",
        category_id: "1",
        photo_url: ""
    })

    const getData = () => {
        axios.get(`http://localhost:3000/recipe/${menuId}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                console.log(res)
                setInputData({ ...inputData, title: res.data.data.title, ingredients: res.data.data.ingredients, photo_url: res.data.data.photo })

            })
            .catch((err) => {
                console.log(err)
            })
    }


    useEffect(() => {
        console.log(menuId)
        getData()
    }, [])



    const postData = (event) => {
        event.preventDefault()
        let BodyformData = new FormData()
        BodyformData.append("title", inputData.title)
        BodyformData.append("ingredients", inputData.ingredients)
        BodyformData.append("category_id", inputData.category_id)
        BodyformData.append("photo", photo)

        console.log(BodyformData)

        axios.put(`http://localhost:3000/recipe/${menuId}`, BodyformData, { headers: { Authorization: `Bearer ${token}`, "Content-Type": 'multipart/form-data' } })
            .then((res) => {
                console.log(res)
                navigate('/')

            })
            .catch((err) => {
                console.log(err)
            })

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
                <h1>{inputData.title}</h1>
                <img src={inputData.photo_url} width={200} />
                {/* <input type="text" name='title' value={inputData.title} className='form-control col-4' onChange={onChange} placeholder='title' /> */}
                <h3>Ingredients</h3>
                <p>{inputData.ingredients}</p>
                {/* <input type="text" name='ingredients' value={inputData.ingredients} className='form-control col-4' onChange={onChange} placeholder='ingredients' /> */}
                {/* <input type="file" name='photo' className='form-control col-4' onChange={onChangePhoto} placeholder='photo' /> */}




                {/* <button type="submit" className="btn btn-warning">Update menu</button> */}


            </form>
            <Footer />
        </div>
    )
}