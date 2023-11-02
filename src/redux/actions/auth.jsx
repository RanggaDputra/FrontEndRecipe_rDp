import axios from "axios";
let url = import.meta.env.VITE_BASE_URL

export const login = (data,navigate) => 
    async (dispatch) => {
        try{
            dispatch({type:"AUTH_LOGIN_PENDING"})
            const result = await axios.post(url+`/users/login`,data)
            
            localStorage.setItem("token",result.data.users.token)
            
            dispatch({payload:result.data.users,type:"AUTH_LOGIN_SUCCESS"})
            navigate('/home')
        } catch(err){
            console.log("error")
            dispatch({payload:err.response.data.message,type:"AUTH_LOGIN_FAILED"})
            console.log(err)
        }
    }
    export const register = (data,navigate) => 
    async (dispatch) => {
        try{
            dispatch({type:"AUTH_REGISTER_PENDING"})
            const result = await axios.post(url+`/users/register`,data)
            
            // localStorage.setItem("token",result.data.users.token)
            
            dispatch({payload:result.data.users,type:"AUTH_REGISTER_SUCCESS"})
            navigate('/login')
        } catch(err){
            console.log("error")
            dispatch({payload:err.response.data.message,type:"AUTH_REGISTER_FAILED"})
            console.log(err)
        }
    }