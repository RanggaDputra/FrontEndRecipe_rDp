import React, { Fragment } from "react"
import { Link, useParams } from "react-router-dom"
import '../navbar/index.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function Navbar({ }) {
    const auth = useSelector((state) => state.auth.data)
    const navigate = useNavigate()
    const logout = () => {

        localStorage.clear()
        navigate('/')
    }
    return (


        <div>
            <nav className="navbar navbar-expand-lg bg-body-transparent">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="index.html">Home</a>

                            </li>
                            <li className="nav-item">
                                <Link to={'/menu'} className="nav-link" >menu</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="detailProfile.html">Profile</a>
                            </li>
                        </ul>
                        <span className="navbar-text">
                            {localStorage.getItem("token") &&
                                <img src={auth?.photo ?? "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"}/>
                            }
                            {
                                localStorage.getItem("token") ?
                                    <p>{auth?.username}</p> :
                                    null
                            }
                            {/* <p>Ayudia</p> */}
                        </span>
                        {
                            localStorage.getItem("token") ?
                                <button className="btn btn-danger" onClick={logout}>Logout</button> :
                                null
                        }
                    </div>
                </div>
            </nav>
        </div>

    )
}