import React from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import Navbar from "../../components/navbar"
import Footer from "../../components/Footer"

let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJndWVzdCIsImVtYWlsIjoiZ3Vlc3RAYWRtaW4uaWQiLCJwaG90byI6bnVsbCwiY3JlYXRlZF9hdCI6IjIwMjMtMDctMjVUMDc6NTA6MTIuNTgzWiIsImlhdCI6MTY5MDI3MzU2N30.KZtPY60Ip5cZbpavNRhUwF7PXOmZXD56UYxIgXbnKe8`

export default function UpdateMenu() {
    const navigate = useNavigate()
    const {menuId} = useParams()
    const [photo, setPhoto] = useState(null)
    const [inputData, setInputData] = useState({
        title: "",
        ingredients: "",
        category_id: "1",
        photo_url: ""
    })

    const getData = () =>{
        axios.get(`http://localhost:3000/recipe/${menuId}`,{headers :{Authorization : `Bearer ${token}`}})
        .then((res)=>{
            console.log(res)
            setInputData({...inputData,title:res.data.data.title,ingredients:res.data.data.ingredients,photo_url:res.data.data.photo})
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    useEffect(()=>{
        console.log(menuId)
        getData()
    },[])

    

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
            <Navbar/>
            <h3>Input Menu</h3>
            <form onSubmit={postData} className='row col-6 gap-2'>
                <input type="text" name='title' value={inputData.title} className='form-control col-4' onChange={onChange} placeholder='title' />
                <input type="text" name='ingredients' value={inputData.ingredients} className='form-control col-4' onChange={onChange} placeholder='ingredients' />
                <input type="file" name='photo' className='form-control col-4' onChange={onChangePhoto} placeholder='photo' />

                
                    <img src={inputData.photo_url} width={200} />
                
                <button type="submit" className="btn btn-warning">Update menu</button>
                

            </form>
            <Footer/>
        </div>
    )
}