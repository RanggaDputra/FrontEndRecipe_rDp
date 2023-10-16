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


    return (
        <>
            <div className="container">
                <Navbar />

                <div className="row mb-5">
                    <div className="col-6">
                        <p className="tag">Discover Recipe<br /><span>& Delicous food</span></p>

                        <div id="input" className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faMagnifyingGlass}/></span>
                            <input id="search" type="text" className="form-control" placeholder="search restaurant, food" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div>
                            <img src={img2} width={350} className="img" />
                        </div>
                        <div className="subs">a</div>
                    </div>
                </div>
                <div className="row  mb-5">
                    <div className="col-6">
                        <div style={{ display: 'flex' }}>
                            <p className="bg-sub">a</p>
                            <p className="title-sub">Popular For You !</p>
                        </div>
                        <div>
                            <img src={img} width={350}></img>
                            <div className="box"></div>
                        </div>
                    </div>
                    <div className="col-6">
                        <h3 className="title">Healthy Bone Broth Ramen (Quick & Easy)</h3>
                        <p style={{ width: 250 }}>Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That’s right!</p>
                        <button className="btn btn-warning text-white">Learn More</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div style={{ display: 'flex' }}>
                            <p className="bg-sub">a</p>
                            <p className="title-sub">New Recipe</p>
                        </div>
                        <div className="sub-cover mt-5">
                            <img src={img3} width={350} className="ms-5"></img>
                            <div className="box2"></div>
                        </div>
                    </div>
                    <div className="col-6">
                        <h3 className="title">Healthy Bone Broth Ramen (Quick & Easy)</h3>
                        <p style={{ width: 250 }}>Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That’s right!</p>
                        <button className="btn btn-warning text-white">Learn More</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div style={{ display: 'flex' }}>
                            <p className="bg-sub">a</p>
                            <p className="title-sub">Popular Recipe</p>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <div>
                                    <img src={img4} width={250} ></img>
                                </div>
                            </div>
                            <div className="col-4">
                            <div>
                                    <img src={img5} width={250} ></img>
                                </div>
                            </div>
                            <div className="col-4">
                            <div>
                                    <img src={img6} width={250} ></img>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-4">
                            <div>
                                    <img src={img7} width={250} ></img>
                                </div>
                            </div>
                            <div className="col-4">
                            <div>
                                    <img src={img8} width={250} ></img>
                                </div>
                            </div>
                            <div className="col-4">
                            <div>
                                    <img src={img9} width={250} ></img>
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