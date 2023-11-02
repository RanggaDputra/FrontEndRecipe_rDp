import React from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer"
import '../menuById/index.css'
import { getMenuDetail, detailMenuReset } from './../../redux/actions/menu'
import {
  postComment,
  getComment,
  deleteComment,
  commentStatusReset,
} from './../../redux/actions/menu'
import { useDispatch, useSelector } from "react-redux"
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';


export default function DetailMenu() {


  const dispatch = useDispatch()
  const { data, isError } = useSelector((state) => state.detail_menu)
  const navigate = useNavigate()
  const { menuId } = useParams()
  const { data: listComment } = useSelector((state) => state.getComment);
  const { isError: postCommentError, data: postCommentData } = useSelector(
    (state) => state.postComment
  );
  const [photo, setPhoto] = useState(null)
  const tokenn = localStorage.getItem("token");
  const decodedToken = tokenn ? jwt_decode(tokenn) : null;
  const { photo: decodedPhoto, username, id } = decodedToken || {};
  const [inputData, setInputData] = useState({
    title: "",
    ingredients: "",
    category_id: "1",
    photo_url: "",
    text: '',
  })

  const [inputComment, setInputComment] = useState({
    text: '',
  });

  const postData = (event) => {
    event.preventDefault()
    let BodyformData = new FormData()
    BodyformData.append("title", inputData.title)
    BodyformData.append("ingredients", inputData.ingredients)
    BodyformData.append("category_id", inputData.category_id)
    BodyformData.append("photo", photo)

    console.log(BodyformData)

  }
  const getDetailMenuById = () => {
    dispatch(getMenuDetail(menuId));
  };

  const getListComment = () => {
    dispatch(getComment(menuId));
  };

  //   const postData2 = (event) => {
  //     event.preventDefault()
  //     let BodyformData = new FormData()
  //     BodyformData.append("text", inputData.text)


  //     console.log(BodyformData)

  //     dispatch(postComment(menuId,BodyformData))

  // }
  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value })
    console.log(inputData)
  }

  const handlePostComment = () => {
    dispatch(postComment(menuId, inputComment)).then(() => {
      dispatch(getComment(menuId));
      setInputComment({ text: '' })
    });
  };

  const onChangeComment = (e) => {
    setInputComment({ ...inputComment, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isError) {
      then(() => {
        navigate('/search-menu');
        dispatch(detailMenuReset());
      });
    }
    getDetailMenuById();
    getListComment();
    window.scrollTo(0, 0);
  }, [isError]);

  // useEffect(() => {
  //   if (postCommentError) {

  //       navigate('/login');
  //       dispatch(commentStatusReset());

  //   } else if (postCommentData) {

  //       dispatch(commentStatusReset());

  //   }
  // }, [postCommentData, postCommentError]);




  useEffect(() => {
    data && setInputData({ ...inputData, title: data.title, photo_url: data.photo, ingredients: data.ingredients, category_id: data.category_id, text: data.text })
  }, [data])

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });



  const handleDeleteComment = (idComment) => {
    then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteComment(idComment));
        then(() => {
          dispatch(getComment(menuId));
        });
      } else {
        Swal.close();
      }
    });
  };


  return (
    <div className="container">
      <Navbar />
      <div className="row">
        <div className="col-md-6 subss-box">

          <div className="sub-title">
            <span className="navbar-text">
              <img src={photo || decodedPhoto} alt="Image Profile" className="rounded-circle" /><br />
              <i className="fa-solid fa-user"><span>{username}</span></i>
            </span>


          </div>
        </div>
        <div className="col-md-6  subss-box2 "><p>{formattedDate}<br /></p></div>
      </div>
      <form onSubmit={postData} className='row col-6 gap-2'>
        <h1>{inputData.title}</h1>
        <img src={inputData.photo_url} width={200} />
        {/* <input type="text" name='title' value={inputData.title} className='form-control col-4' onChange={onChange} placeholder='title' /> */}
        <h3>Ingredients</h3>
        <p>{inputData.ingredients}</p>
      </form>

      <div className="border-top border-bottom border-5 border-warning py-1 mb-5">
        {listComment ? (
          listComment?.map((comment, index) => {
            const isCurrentUserComment =
              parseInt(comment.user_id) ===
              parseInt(localStorage.getItem('id'));
            return (
              <div
                className="d-flex align-items-center gap-3 py-3"
                key={index}
              >
                <div className="d-flex align-items-center gap-1">
                  <div>
                    <img
                      src={comment.photo}
                      alt="comment-photo-user"
                      className={`rounded-circle`}
                      style={{ width: '35px', height: '35px', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <div className={`fw-bold `} style={{ width: '90px', fontSize: '13px' }}>{comment.username}</div>
                  </div>
                </div>
                <div className='d-flex justify-content-between align-items-center w-100 border-start border-4 border-warning ps-2'>
                  <div style={{ fontSize: '13px' }}>{comment.text}</div>
                  <div>
                    {isCurrentUserComment ? (
                      <span onClick={() => handleDeleteComment(comment.id)} style={{ cursor: 'pointer', color: 'red', fontSize: '13px' }} className='px-2 py-1 border-0 bg-danger rounded text-white d-flex justify-content-center align-items-center gap-2'>
                        <i
                          className="bi bi-trash-fill"
                        ></i>
                        Delete
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-3">
            <p style={{ color: '#EFC81A' }} className="fw-bold text-center pt-3">There are no comments here, be the first to comment!</p>
          </div>
        )}
      </div>


      <div className="comment col-sm-12 col-md-12">
        <textarea
          name="text"
          onChange={onChangeComment}
          value={inputComment.text}
          id="text"
          className="w-100 p-3 rounded border-0 form-control bg-body-tertiary"
          placeholder="Your comment here!"
          rows={5}
        ></textarea>
      </div>
      <div className="col-sm-12 col-md-6 col-lg-3">
        <button
          className="rounded p-3 mb-5 mt-3 border-0 bg-warning text-white w-100"
          onClick={() => handlePostComment()}
        >
          Send a comment
        </button>
      </div>



      <Footer />
    </div>
  )
}