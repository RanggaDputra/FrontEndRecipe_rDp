import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Alert from "../../components/Alert"
import Navbar from "../../components/navbar"
import Footer from "../../components/Footer"
import '../Menu/index.css'

let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJndWVzdCIsImVtYWlsIjoiZ3Vlc3RAYWRtaW4uaWQiLCJwaG90byI6bnVsbCwiY3JlYXRlZF9hdCI6IjIwMjMtMDctMjVUMDc6NTA6MTIuNTgzWiIsImlhdCI6MTY5MDI3MzU2N30.KZtPY60Ip5cZbpavNRhUwF7PXOmZXD56UYxIgXbnKe8`

export default function Menu() {
    
    const baseUrl = 'http://localhost:3000/recipe/detail'
    const [menu, setMenu] = useState([])
    const [text, setText] = useState('')
    const [data, setData] = useState(null)
    const [showAlert, setShowAlert] = useState(false)

    async function searchMenu() {
        try {
            const response = await window.fetch(`${baseUrl}?${text}`)
            const dataSearch = await response.json();
            setMenu(dataSearch.results)
        } catch (e) {
            console.log(e)
        }
    }

    const [alertData, setAlertData] = useState({
        type: "",
        message: ""
    })

    const getData = () => {
        axios.get('http://localhost:3000/recipe', { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                console.log(res)
                setData(res.data.data)

            })
            .catch((err) => {
                console.log(err)
            })
    }
    // const getDataById = (id) => {
    //     axios.get(`http://localhost:3000/recipe/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    //         .then((res) => {
    //             console.log(res)
    //             setData(res.data.data)

    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }


    useEffect(() => {
        getData()
        setAlertData({ ...alertData, type: "primary", message: "berhasil get data" })
        setShowAlert(true)
    }, [])


    const deleteData = (id) => {
        axios.delete(`http://localhost:3000/recipe/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                console.log(res)
                getData()
                setAlertData({ ...alertData, type: "warning", message: "berhasil hapus data" })
                setShowAlert(true)
            })
            .catch((err) => {
                console.log(err)
                getData()
                setAlertData({ ...alertData, type: "danger", message: err.response.data.message })
                setShowAlert(true)
            })
    }


    return (
        <>
            <div className="container">
                <Navbar/>
                
                {showAlert && <Alert type={alertData.type} message={alertData.message} />}
                <h2>Discover Recipe</h2>
                <h2>& Delicious Food</h2>
                <div className="search2">
                    <div className="container-fluid">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={text} onChange={(e) => setText(e.target.value)} />
                            <button className="btn btn-outline-success" onClick={searchMenu} >Search</button>
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

                                            <button className="btn btn-warning m-2" onClick={() => deleteData(item.id)}>Delete</button>
                                            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    )
                })}
                 <Footer/>
            </div>

           
        </>
    )
}