import React from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useNavigate,Link } from 'react-router-dom'
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer"
import '../menuById/index.css'
import { getMenuByUsers,deleteMenu } from './../../redux/actions/menu'
import { useDispatch, useSelector } from "react-redux"
import jwt_decode from "jwt-decode";


export default function Profil() {

    const { data, isLoading, } = useSelector((state) => state.detail_menu)
    const navigate = useNavigate()
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [recipeTitle, setRecipeTitle] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [openModal, setOpenModal] = useState(false); const [selectedMenuId, setSelectedMenuId] = useState(null);
    const recipesPerPage = 5;
    const tokenn = localStorage.getItem("token");
    const decodedToken = tokenn ? jwt_decode(tokenn) : null;
    const { photo, username, id } = decodedToken || {};
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMenuByUsers(id, navigate)).catch((error) => {
            setIsError(true);
            setErrorMessage("Recipe data not found");
        });
    }, [dispatch, id, navigate]);

    // Set recipes data when data is available
    useEffect(() => {
        if (data && data.length > 0) {
            setRecipes(data);
        }
    }, [data]);


    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = data ? data.slice(indexOfFirstRecipe, indexOfLastRecipe) : [];

    const truncateDescription = (description) => {
        const words = description.split(" ");
        if (words.length > 10) {
            return words.slice(0, 8).join(" ") + "...";
        }
        return description;
    };

    const handleEditMenu = (recipeId) => {
        navigate(`/update-menu/${recipeId}`);
    };

    const handleDetailMenu = (recipeId) => {
        navigate(`/menu-detail/${recipeId}`);
    };
    const handleDeleteMenu = (recipeId) => {
        navigate(`/menu-detail/${recipeId}`);
    };

    const handleDetailProfile = () => {
        navigate(`/edit-profil`);
    };



    return (
        <div className="container">
            <Navbar />
            <div className="row" style={{marginLeft:130,marginTop:50}}>
                <div className="col-6 d-flex">
                    
                    <div className="">
                        <div className="sub-tag">a</div>
                        <img src={photo} alt="Search" width="50" style={{marginTop:-90,marginLeft:20}} onClick={handleDetailProfile} className="rounded-circle" />
                    </div>
                    <div className="text ms-3 mt-3">
                        <p className="mb-0 text-dark">{username}</p>
                        {data ? (
                            <p className="mb-0 text-dark">
                                <strong>{data.length} Recipe</strong>
                            </p>
                        ) : (
                            <p className="mb-0">
                                <strong>0 Recipes</strong>
                            </p>
                        )}
                    </div>
                </div>
                <div className="col-6">
                    <div className="align-items-center pe-5">
                        <div className="text pt-4">
                            <p style={{float:'right'}} className="mb-0 text-dark">{formattedDate}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tab-content mt-3" id="myTabContent">
                        <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                            {isError ? (
                                <p className="text-center mt-4">Error: {errorMessage}</p>
                            ) : data && data.length > 0 ? (
                                currentRecipes.map((recipe, index) => (
                                    <div key={index} className="row ms-1 ps-5">
                                        <div className="col-md-4 mt-5 imgCover rounded-4 p-0 me-5" style={{ width: "18rem" }}>
                                            <img src={recipe.photo} alt="Search" className="rounded-4" style={{ width: "18rem", height: "18rem", objectFit: "cover" }} onClick={() => handleDetailMenu(recipe.id)} />
                                        </div>
                                        <div className="col-md-4 titleDesc">
                                            <p className="fs-5 mt-3" onClick={() => handleDetailMenu(recipe.id)}>
                                            {recipe.title}
                                            </p>
                                            <div className="desc">
                                                <p>
                                                    <strong>Ingredients:</strong> <br />
                                                    {truncateDescription(recipe.ingredients)}
                                                </p>
                                            </div>
                                            <button type="button" className="btn btn-warning">
                                                {recipe.likes} Likes - {recipe.comments} Comment - {recipe.bookmarks} Bookmark
                                            </button>
                                            <div className="author mt-3 d-flex">
                                                <button type="button" className="btn me-2 btn-primary " onClick={() => handleEditMenu(recipe.id)}>
                                                    Edit Menu
                                                </button>
                                                <button type="button" className="btn me-2 btn-danger " onClick={() => dispatch(deleteMenu(recipe.id, navigate))}>
                                                    Delete Menu
                                                </button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center mt-4">You havent added any recipes yet. Add your best recipe now!</p>
                            )}
                            <div className="row ms-1 mt-5">
                                <div className="col d-flex align-items-center justify-content-center page">
                                    <div className="pagination">
                                        {Array.from({ length: Math.ceil(recipes.length / recipesPerPage) }, (_, index) => (
                                            <button key={index} className={`btn ${currentPage === index + 1 ? "btn-warning text-light" : "btn-secondary text-dark"} ms-1`} onClick={() => paginate(index + 1)}>
                                                {index + 1}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="row ms-1">
                                <div className="col d-flex align-items-center justify-content-center page">
                                    <h5 className="mt-2">
                                        Show {indexOfFirstRecipe + 1} - {Math.min(indexOfLastRecipe, recipes.length)} From {recipes.length}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab"></div>
                        <div className="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                            <h3>Ini adalah konten Tab 3</h3>
                            <p>Isi dari tab 3 akan ditampilkan di sini.</p>
                        </div>
                    </div>
            <Footer />
        </div>
    )
}