import axios from "axios";
let url = import.meta.env.VITE_BASE_URL
let headers = {
    Authorization : `Bearer ${localStorage.getItem("token")}`
}

export const getMenuDetail = (id) => 
    async (dispatch) => {
        try{
            dispatch({type:"DETAIL_MENU_PENDING"})
            const result = await axios.get(url+`/recipe/${id}`,{headers})
            dispatch({payload:result.data.data,type:"DETAIL_MENU_SUCCESS"})
        } catch(err){
            console.log("error")
            dispatch({payload:err.response,type:"DETAIL_MENU_FAILED"})
            console.log(err)
        }
    }
    export const getProfilDetail = () => 
    async (dispatch) => {
        try{
            dispatch({type:"DETAIL_MENU_PENDING"})
            const result = await axios.post(url+`/users/login`,{headers})
            // localStorage.setItem("token",result.data.users.token)
            dispatch({payload:result.data.data,type:"DETAIL_MENU_SUCCESS"})
        } catch(err){
            console.log("error")
            dispatch({payload:err.response,type:"DETAIL_MENU_FAILED"})
            console.log(err)
        }
    }
    export const getProfilDetailById = (id) => 
    async (dispatch) => {
        try{
            dispatch({type:"USERS_MENU_PENDING"})
            const result = await axios.get(url+`/users/${id}`,{headers})
            
            dispatch({payload:result.data.data,type:"USERS_MENU_SUCCES"})
        } catch(err){
            console.log("error")
            dispatch({payload:err.response,type:"USERS_MENU_FAILED"})
            console.log(err)
        }
    }
    export const getMenuByUsers = (id) => 
    async (dispatch) => {
        try{
            dispatch({type:"DETAIL_MENU_PENDING"})
            const result = await axios.get(url+`/recipe/users/${id}`,{headers})
            
            dispatch({payload:result.data.data,type:"DETAIL_MENU_SUCCESS"})
        } catch(err){
            console.log("error")
            dispatch({payload:err.response,type:"DETAIL_MENU_FAILED"})
            console.log(err)
        }
    }

export const getMenu = (page) => 
    async (dispatch) => {
        try{
            dispatch({type:"GET_MENU_PENDING"})
            const result = await axios.get(url+`/recipe`,{headers})
            
            dispatch({payload:result.data.data,type:"GET_MENU_SUCCESS"})
        } catch(err){
            console.log("error")
            dispatch({payload:err.response,type:"GET_MENU_FAILED"})
            console.log(err)
        }
    }

export const searchMenu = (data) => 
    async (dispatch) => {
        try{
            dispatch({type:"GET_MENU_PENDING"})
            const result = await axios.get(url+`/recipe/detail?search=${data}`,{headers})
            dispatch({payload:result.data.data,type:"GET_MENU_SUCCESS"})
        } catch(err){
            console.log("error")
            dispatch({payload:err.response,type:"GET_MENU_FAILED"})
            console.log(err)
        }
    }

export const deleteMenu = (id,navigate) => 
    async (dispatch) => {
        try{
            dispatch({type:"DELETE_MENU_PENDING"})
            const result = await axios.delete(url+`/recipe/${id}`,{headers})
            console.log(result)
            navigate('/profile')
            dispatch({payload:result.data.data,type:"DELETE_MENU_SUCCESS"})
        } catch(err){
            console.log("error")
            dispatch({payload:err.response.data.message,type:"DELETE_MENU_FAILED"})
            console.log(err)
        }
    }
export const postMenu = (data,navigate) => 
    async (dispatch) => {
        try{
            dispatch({type:"POST_MENU_PENDING"})
            const result = await axios.post(url+`/recipe`,data,{headers})
            console.log(result)
            navigate('/')
            dispatch({payload:result.data.data,type:"POST_MENU_SUCCESS"})
        } catch(err){
            console.log("error")
            dispatch({payload:err.response.data.message,type:"POST_MENU_FAILED"})
            console.log(err)
        }
    }

export const updateMenu = (data,id,navigate) => 
    async (dispatch) => {
        try{
            dispatch({type:"PUT_MENU_PENDING"})
            const result = await axios.put(url+`/recipe/${id}`,data,{headers})
            console.log(result)
            navigate('/')
            dispatch({payload:result.data.data,type:"PUT_MENU_SUCCESS"})
        } catch(err){
            console.log("error")
            dispatch({payload:err.response.data.message,type:"PUT_MENU_FAILED"})
            console.log(err)
        }
    }
    
    export const updateProfil = (data,id,navigate) => 
    async (dispatch) => {
        try{
            dispatch({type:"PUT_USERS_PENDING"})
            const result = await axios.put(url+`/users/${id}`,data,{headers})
            console.log(result)
            navigate('/')
            dispatch({payload:result.data.data,type:"PUT_USERS_SUCCESS"})
        } catch(err){
            console.log("error")
            dispatch({payload:err.response.data.message,type:"PUT_USERS_FAILED"})
            console.log(err)
        }
    }