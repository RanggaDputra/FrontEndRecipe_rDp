import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import Navbar from "../../components/navbar"
import Footer from "../../components/Footer"
import '../Menu/index.css'
import { useDispatch, useSelector } from "react-redux"
import { getMenu, deleteMenu,searchMenu } from "./../../redux/actions/menu"
import Alert from "../../components/Alert"


export default function Menu() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const [menu, setMenu] = useState([])
    // const { menu, delete_menu } = useSelector((state) => state)
    const {menu, delete_menu} = useSelector((state)=>state)
    const {data,isError,errorMessage,isLoading} = menu
    const [search,setSearch] = useState("")
    // const [data, setData] = useState(null)
    // const [showAlert, setShowAlert] = useState(false)



    // const [alertData, setAlertData] = useState({
    //     type: "",
    //     message: ""
    // })

    // const getData = () => {
    //     axios.get('http://localhost:3000/recipe', { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
    //         .then((res) => {
    //             console.log(res)
    //             setData(res.data.data)

    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    useEffect(() => {

        dispatch(getMenu())
        // setAlertData({ ...alertData, type: "primary", message: "berhasil get data" })
        // setShowAlert(true)
    }, [])

    useEffect(()=>{
        search.length >= 3 && dispatch(searchMenu(search))
        search == '' &&  dispatch(getMenu())
      },[search])


    // const deleteData = (id) => {
    //     axios.delete(`http://localhost:3000/recipe/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    //         .then((res) => {
    //             console.log(res)
    //             getData()
    //             setAlertData({ ...alertData, type: "warning", message: "berhasil hapus data" })
    //             setShowAlert(true)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             getData()
    //             setAlertData({ ...alertData, type: "danger", message: err.response.data.message })
    //             setShowAlert(true)
    //         })
    // }


    return (
        <>
            <div className="container">
                <Navbar />

                {/* {showAlert && <Alert type={alertData.type} message={alertData.message} />} */}
                {delete_menu.isError &&
                    <Alert type="danger" message={delete_menu.errorMessage} />
                }
                {!delete_menu.isError &&
                    <Alert type="primary" message="berhasil delete menu" />
                }
                <h2>Discover Recipe</h2>
                <h2>& Delicious Food</h2>
                {isLoading && <div className="spinner-border text-light" role="status">
                    <span className="sr-only"></span>
                </div>}
                <div className="search2">
                    <div className="container-fluid">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name='search' value={search} onChange={(e)=>setSearch(e.target.value)} />
                            <button className="btn btn-outline-success">Search</button>
                        </form>
                    </div>

                </div>
                <div className="m-3">
                    <p className="d-inline-flex gap-1">
                        <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Recipes
                        </a>
                        <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Bookmarked
                        </a>
                        <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample3" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Liked
                        </a>
                        <button type="button" className="btn btn-success btn23" ><Link to={'/inputmenu'} className="anchor">Input Menu</Link></button>

                    </p>
                </div>
                {data?.map((item, index) => {
                    return (
                        <div key={item.id} onClick={() => console.log(item.id)}>
                            <div className="card mb-3 card23">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={item.photo} height={100} className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Menu</h5>
                                            <p className="card-text"><Link to={`/menu-detail/${item.id}`}>{item.title}</Link></p>
                                            <Link to={`/update-menu/${item.id}`}>
                                                <button className="btn btn-primary m-2">Update</button>
                                            </Link>

                                            <button className="btn btn-warning m-2" onClick={() => dispatch(deleteMenu(item.id, navigate))}>Delete</button>
                                            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    )
                })}
                <Footer />
            </div>


        </>
    )
}