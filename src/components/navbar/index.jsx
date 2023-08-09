import React, { Fragment } from "react"
import { Link, useParams } from "react-router-dom"
import '../navbar/index.css'

export default function Navbar({ }) {
    return (
        <>
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
                                        <Link to={'/menu'}className="nav-link" >menu</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="detailProfile.html">Profile</a>
                                    </li>
                                </ul>
                                <span className="navbar-text">
                                    <img src="public/waw.jpeg" /><p>Ayudia</p>
                                </span>
                            </div>
                        </div>
                    </nav>
                </div>
        </>
    )
}