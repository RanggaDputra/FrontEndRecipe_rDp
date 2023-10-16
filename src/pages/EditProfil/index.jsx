import React from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer"
import '../menuById/index.css'
import { updateProfil } from './../../redux/actions/menu'
import { useDispatch, useSelector } from "react-redux"
import jwt_decode from "jwt-decode";


export default function EditProfil() {
    const dispatch = useDispatch()
    const { data } = useSelector((state) => state.detail_menu)
    const navigate = useNavigate()
    const tokenn = localStorage.getItem("token");
    const decodedToken = tokenn ? jwt_decode(tokenn) : null;
    const [photo, setPhoto] = useState(null)
    const { photo: decodedPhoto, username, id } = decodedToken || {};

    const [inputData, setInputData] = useState({
        username: username,
        photo: null,
    })
    function previewImage(event) {
        const fileInput = event.target;
        const imagePreview = document.getElementById("imagePreview");

        while (imagePreview.firstChild) {
            imagePreview.removeChild(imagePreview.firstChild);
        }

        const image = document.createElement("img");
        image.src = URL.createObjectURL(fileInput.files[0]);
        imagePreview.appendChild(image);
        imagePreview.style.display = "block";

        const uploadLabel = document.getElementById("uploadLabel");
        uploadLabel.innerText = "Change Photo";

        setInputData({
            ...inputData,
            username: username,
        });
        setPhoto(fileInput.files[0]);
    }

    useEffect(() => {
        setInputData((prevData) => ({
            ...prevData,
            username: username,
        }));

        setPhoto(decodedPhoto);
    }, [username, decodedPhoto]);

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("username", inputData.username);

        if (photo) {
            formData.append("photo", photo);
        }

        dispatch(updateProfil(formData, id, navigate));
    };


    return (
        <div className="container">
            <Navbar />
            <div className="row" style={{ marginBottom: 140 }}>
                <div className="col-12 text-center">
                    <div id="imagePreview" className="size-img">
                        <img src={photo || decodedPhoto} alt="Image Profile" className="rounded-circle" /><br />
                    </div>
                    <div style={{ marginTop: -140 }}>

                        <label htmlFor="imageUpload" className="custom-file-upload-profile text-white" id="uploadLabel" style={{ width: 150, backgroundColor: '#EFC81A', borderRadius: 10 }} >
                            Change Photo
                        </label>
                        <input type="file" className="form-control visually-hidden" id="imageUpload" accept="image/*" onChange={previewImage} name="photo" />
                    </div>

                </div>


            </div>
            <div className="row">
                <div className="col-12">

                    <form onSubmit={handleUpdateProfile}>
                        <div className="mb-3" style={{marginLeft:380}}>
                            <label htmlFor="exampleInputName1" width={100} className="form-label text-secondary">
                                Change Name
                            </label>
                            <input 
                            style={{width:350}}
                                type="text"
                                className="form-control text-secondary "
                                id="exampleInputName1"
                                placeholder="New Name"
                                required
                                value={inputData.username}
                                onChange={(e) => setInputData({ ...inputData, username: e.target.value })}
                            />
                        </div>
                        <div className="d-flex justify-content-center">

                        <button type="submit" className="btn me-2 btn-warning text-light" style={{width:360}}>
                            Update Profile
                        </button>
                        </div>
                        
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    )
}