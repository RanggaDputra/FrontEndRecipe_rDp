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
import { ToastContainer, toast } from "react-toastify";



export default function Menu() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryFilter, setCategoryFilter] = useState("");
    const { menu, delete_menu } = useSelector((state) => state)
    const { data, isError, errorMessage, isLoading } = menu

    const recipesPerPage = 5;
    useEffect(() => {
        if (isError && errorMessage) {
            toast.warn(errorMessage, {
                hideProgressBar: true,
                autoClose: 2000,
            });
        } else if (isError && !errorMessage) {
            toast.error("Something wrong");
        }
    }, [isError, errorMessage]);
    const getFirst10Words = (sentence) => {
        return sentence.split(" ").slice(0, 8).join(" ");
    };

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        dispatch(getMenu(navigate));
    }, []);

    const handleCategoryFilterChange = (category) => {
        setCategoryFilter(category);
        setCurrentPage(1);
    };

    const filteredRecipes = data
        ? data.filter((item) => {
            const isTitleMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
            const isCreatorMatch = item.author.toLowerCase().includes(searchTerm.toLowerCase());
            const isCategoryMatch = categoryFilter === "" || item.category.toLowerCase() === categoryFilter.toLowerCase();
            return (isTitleMatch || isCreatorMatch) && isCategoryMatch;
        })
        : [];

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const isActiveCategory = (category) => {
        return categoryFilter === category;
    };

    console.log(data);


    return (
        <>
            <div className="container">
                <Navbar />

                
                <h2>Discover Recipe</h2>
                <h2>& Delicious Food</h2>
                {isLoading && <div className="spinner-border text-light" role="status">
                    <span className="sr-only"></span>
                </div>}
                <div className="search2">
                    <div className="container-fluid">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm} onChange={handleSearchInputChange} />
                            <button className="btn btn-outline-success">Search</button>
                        </form>
                    </div>

                </div>
                {/*  */}
                <div className="m-3">
                    <p className="d-inline-flex gap-1">
                        <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"  onClick={() => handleCategoryFilterChange("Appetizers")}>
                        Appetizers
                        </a>
                        <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" onClick={() => handleCategoryFilterChange("Main Course")}>
                        Main Course
                        </a>
                        <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample3" role="button" aria-expanded="false" onClick={() => handleCategoryFilterChange("Dessert")}>
                        Dessert
                        </a>
                        <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample3" role="button" aria-expanded="false" onClick={() => handleCategoryFilterChange("")}>
                        All
                        </a>
                        <button type="button" className="btn btn-success btn23" ><Link to={'/inputmenu'} className="anchor">Input Menu</Link></button>

                        {/* <button type="button" className="btn btn-success btn23" ><Link to={`/profil/${item.id}`} className="anchor">Input Menu</Link></button> */}

                    </p>
                </div>
                {currentRecipes?.map((item, index) => {
                    return (
                        <div key={item.id} onClick={() => console.log(item.id)}>
                            <div className="card mb-3 card23">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={item.photo} style={{ height: 200, width: 230 }} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body ms-5">
                                            <h5 className="card-title">Menu</h5>
                                            <p className="card-text"><Link to={`/menu-detail/${item.id}`}>{item.title}</Link></p>
                                            <label>Ingredients</label>
                                            <p>{item.ingredients.split(" ").length > 8 ? getFirst10Words(item.ingredients) + " ..." : item.ingredients}</p>
                                            {/* <Link to={`/update-menu/${item.id}`}>
                                                <button className="btn btn-primary m-2">Update</button>
                                            </Link>

                                            <button className="btn btn-warning m-2" onClick={() => dispatch(deleteMenu(item.id, navigate))}>Delete</button> */}
                                            <button type="button" className="btn btn-warning text-white" style={{ fontSize: 10 }}>
                                                10 Likes - 12 Comment - 3 Bookmark
                                            </button>
                                            <div style={{ display: 'flex' }}>
                                                <img src={item.author_photo} alt="Search" className="me-3 rounded-circle" width={50} />
                                                <h6 className="mt-2 text-capitalize">{item.author}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    )
                })}
                 
                <div className="row">
                    <div className="col d-flex align-items-center justify-content-center mt-5 page">
                        <div className="pagination">
                            {Array.from({ length: Math.ceil(filteredRecipes.length / recipesPerPage) }).map((_, index) => (
                                <button key={index} type="button" className={`btn ${currentPage === index + 1 ? "btn-warning text-light" : "btn-secondary text-dark"} ms-1`} onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="row">
                        <div className="col d-flex align-items-center justify-content-center page">
                            <h5 className="mt-2">
                                Show {indexOfFirstRecipe + 1}-{Math.min(indexOfLastRecipe, filteredRecipes.length)} From {filteredRecipes.length}
                            </h5>
                        </div>
                    </div>
                <Footer />
                <ToastContainer />
            </div>


        </>
    )

}