import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import '../navbar/index.css'
import { useNavigate,useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch} from "react-redux"
import { getProfilDetail} from './../../redux/actions/menu'
import jwt_decode from "jwt-decode";
import { getMenu, deleteMenu, searchMenu } from "./../../redux/actions/menu"
import { ToastContainer, toast } from "react-toastify";

export default function Navbar({ }) {
    
    const auth = useSelector((state) => state.auth.data)
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwt_decode(token) : null;
    const { photo, username } = decodedToken || {};
    const [isLoadingLogout, setIsLoadingLogout] = useState(false);
    const logout = () => {
        
        localStorage.clear()
        navigate('/')
    }
    const recipesPerPage = 5;
    const handleConfirmLogout = () => {
        setIsLoadingLogout(true);
        localStorage.clear();
        navigate("/login");
    };
    const handleSearch = () => {
        toast.warn("For more complete features, please login first.", {
            hideProgressBar: true,
            autoClose: 2000,
        });
    };
   
    const handleProfileClick = () => {
        navigate(`/profile`);
    };
    
    

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
                        {token ? (
                                <li className={`nav-item me-5 ${location.pathname === "/" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/home" onClick={() => handleActivePage("Home")}>
                                        Home
                                    </Link>
                                </li>
                            ) : (
                                <li className={`nav-item me-5 ${location.pathname === "/regis" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/register" onClick={() => handleActivePage("Register")}>
                                        Register
                                    </Link>
                                </li>
                            )}
                            {token ? (
                                <li className={`nav-item me-5 ${location.pathname === "/add" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/inputmenu" onClick={() => handleActivePage("AddMenu")}>
                                        Add Menu
                                    </Link>
                                </li>
                            ) : (
                                <li className={`nav-item me-5 ${location.pathname === "/login" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/login" onClick={() => handleActivePage("Login")}>
                                        Login
                                    </Link>
                                </li>
                            )}
                            {token ? (
                                <li className={`nav-item ${location.pathname === "/search" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/menu" onClick={() => handleActivePage("SearchMenu")}>
                                        Search Menu
                                    </Link>
                                </li>
                            ) : (
                                <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/" onClick={handleSearch}>
                                        Search Menu
                                    </Link>
                                </li>
                            )}
                        </ul>
                        
                    </div>
                    {token ? (
                        
                    <div className="user d-flex justify-content-center align-items-center">
                        <div className="photo me-4">
                            <img src={photo} alt="Search"  className="rounded-circle" onClick={handleProfileClick} />
                           
                        </div>
                        <div>
                        <p  style={{paddingLeft:20}}>{username}</p>
                        <button onClick={handleConfirmLogout} style={{marginTop:-20,fontWeight:'bold'}} className="btn btn-transparent">Logout</button>
                        </div>
                    </div>
                ) : (
                    <div className="user d-flex justify-content-center align-items-center  visually-hidden">
                        <div className="photo me-4" >
                            <img src={auth?.photo} alt="Search"  onClick={handleProfileClick} />
                        </div>
                        <div className="text">
                            <p className="mb-0 text-dark">{auth?.username}</p>
                            <p className="mb-0">
                                <p onClick={logout} className="text-dark">
                                    <strong>Logout</strong>
                                </p>
                            </p>
                        </div>
                    </div>
                )}
                </div>
               
            </nav>
        </div>

    )
}
