import axios from 'axios';

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILURE,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILURE} from '../constants/productConstants';

export const listProducts = () => async(dispatch) => {
    try {
        dispatch({type:PRODUCT_LIST_REQUEST});

        const { data } = await axios.get('/api/products')

        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload : data
        })
    }
    catch(error){
        dispatch({type:PRODUCT_LIST_FAILURE});
        let payload = error.response && error.response.data.detail ?
             error.response.data.detail :
             error.response
    }
}    

export const listProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST});

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload : data
        })
    }
    catch(error){
        dispatch({type:PRODUCT_DETAILS_FAILURE});
        let payload = error.response && error.response.data.detail ?
             error.response.data.detail :
             error.response
    }
}   