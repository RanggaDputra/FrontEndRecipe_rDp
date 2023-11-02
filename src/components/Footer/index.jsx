import React, { Fragment } from "react"
import '../Footer/foter.css'

export default function Footer({ }) {
  return (
    <>
      <div className="row">
        <div className="col-md-12">

      <div className="card text-center crd12" >
      <div className="card-body crdb ">
        <h5 className="card-title">Eat, Cook, Repeat</h5>
        <p className="card-text">Share your best recipe by uploading here!</p>
      
      </div>
      <div className="card-footer text-body-secondary crd">
        <p className="text-center ft1"><a href="#">Product </a><a href="#">Company </a><a href="#">Learn More
        </a><a href="#">Get In Touch </a></p>
      </div>
      </div>
       
        </div>
      </div>
    </>
  )
}