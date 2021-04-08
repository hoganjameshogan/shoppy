import axios from 'axios';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT, 
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAILURE,
 } from '../constants/userConstants';

export const login = (email,password) => async(dispatch) => {
    try {
        dispatch({
            type:USER_LOGIN_REQUEST,
        })
        let entry = {'username':email, 'password':password}
        let config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        let { data } = await axios.post('/api/users/login/', entry, config);

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo',JSON.stringify(data))
    }
    catch(error) {
        dispatch({
            type:USER_LOGIN_FAILURE,
            payload : error.response && error.response.data.detail ?
            error.response.data.detail :
            error.response
        })
    }
    
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({
        type:USER_LOGOUT
    })
}

export const register = (name, email, password) => async(dispatch) => {
    try{
        dispatch({
            type:USER_REGISTER_REQUEST
        })

        let entry = {'name':name,'email':email, 'password':password}
        let config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        let { data } = await axios.post('/api/users/register/', entry, config )
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        });
        console.log(data);
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        });
        console.log(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch(error){
        dispatch({
            type:USER_REGISTER_FAILURE,
            payload : error.response && error.response.data.detail ?
            error.response.data.detail :
            error.response
        })
    }
}

export const getUserDetails = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type:USER_DETAILS_REQUEST
        })

        const { userlogin : {userInfo}} = getState()

        let config = {
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        let { data } = await axios.get(`/api/users/${id}`, config )
        console.log(data);
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data
        });
        
        // dispatch({
        //     type:USER_DETAILS_SUCCESS,
        //     payload:data
        // });
    }
    catch(error){
        dispatch({
            type:USER_DETAILS_FAILURE,
            payload : error.response && error.response.data.detail ?
            error.response.data.detail :
            error.response
        })
    }
}