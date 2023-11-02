import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import Navbar from "../../components/navbar"
import Footer from "../../components/Footer"
import '../Menu/index.css'
import { useDispatch, useSelector } from "react-redux"
import { getMenu, deleteMenu, searchMenu } from "./../../redux/actions/menu"
import Alert from "../../components/Alert"
import '../home/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import img2 from '../../assets/image2.png'
import img from '../../assets/kacau.png'
import img3 from '../../assets/yaya.png'
import img4 from '../../assets/hiyaaa.png'
import img5 from '../../assets/pola.png'
import img6 from '../../assets/pola1.png'
import img7 from '../../assets/pola2.png'
import img8 from '../../assets/pola3.png'
import img9 from '../../assets/pola4.png'


export default function Home() {
    const navigate = useNavigate()
    const handleSearch = () => {
        navigate(`/menu`);
    };
    return (
        <>
            <div className="container">
                <Navbar />

                <div id="main-text" className="row mt-4 mb-5">
                    <div className="col-6 sub-title1">
                        <p className="tag">Discover Recipe<br /><span>& Delicous food</span></p>
                        <p className="tag2">Discover Recipe<br /><span>& Delicous food</span></p>

                        <div id="input" className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                            <input id="search" type="text" className="form-control" placeholder="search restaurant, food" aria-label="Username" aria-describedby="basic-addon1" onClick={handleSearch} />
                        </div>
                    </div>
                    <div id="img-title" className="col-6">
                        <div>
                            <img src={img2} width={350} className="img" />
                        </div>
                        <div className="subs">a</div>
                    </div>
                </div>
                <div className="row  mb-5">
                    <div className="col-md-6">
                        <div className="subs-tag" style={{ display: 'flex' }}>
                            <p className="bg-sub">a</p>
                            <p className="title-sub">Popular For You !</p>
                        </div>
                        <div className="boxs-img">
                            <img src={img} width={350}></img>
                            <div className="box"></div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="subs-tag2">

                            <h3 className="title">Healthy Bone Broth Ramen (Quick & Easy)</h3>
                            <p className="title2" style={{ width: 250 }}>Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That’s right!</p>
                            <button className="btn btn-warning text-white title2">Learn More</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div style={{ display: 'flex' }}>
                            <p className="bg-sub">a</p>
                            <p className="title-sub">New Recipe</p>
                        </div>
                        <div className="sub-cover mt-4">
                            <img src={img3} width={350} className="ms-5"></img>
                            <div className="box2"></div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3 className="title">Healthy Bone Broth Ramen (Quick & Easy)</h3>
                        <p className="title2" style={{ width: 250 }}>Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That’s right!</p>
                        <button className="btn btn-warning text-white title2 mb-5">Learn More</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div style={{ display: 'flex' }}>
                            <p className="bg-sub">a</p>
                            <p className="title-sub ">Popular Recipe</p>
                        </div>
                        <div className="main-img3  mt-4">
                                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img src={img4} width={320}  alt="..."/>
                                        </div>
                                        <div className="carousel-item">
                                            <img src={img5} width={320}  alt="..."/>
                                        </div>
                                        <div className="carousel-item">
                                            <img src={img6} width={320}  alt="..."/>
                                        </div>
                                        <div className="carousel-item">
                                            <img src={img7} width={320}  alt="..."/>
                                        </div>
                                        <div className="carousel-item">
                                            <img src={img8} width={320}  alt="..."/>
                                        </div>
                                        <div className="carousel-item">
                                            <img src={img9} width={320}  alt="..."/>
                                        </div>
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button id="btn-caro" className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                        <div className="main-img2 ms-5">
                            
                            <div className="row">
                                <div className="col-md-4">
                                    <div>
                                        <img src={img4} width={250} ></img>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <img src={img5} width={250} ></img>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <img src={img6} width={250} ></img>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-4">
                                    <div>
                                        <img src={img7} width={250} ></img>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <img src={img8} width={250} ></img>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <img src={img9} width={250} ></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <Footer />
            </div>


        </>
    )

}