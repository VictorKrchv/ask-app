import {authAPI} from "../Api/api";
const SET_USER_DATA = "auth/SET_USER_DATA"
const DELETE_USER_DATA = "DELETE_USER_DATA"

let initialState = {
    userId: null,
    isAuth: false,
    ready: false,
    email: null,
    login: null,
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ready: true,
                ...action.payload

            }
        }
        case DELETE_USER_DATA: {
            return {
                ...state,
                userId: null, email: null, login: null, isAuth: false
            }
        }
        default:
            return state
    }
}


export const setUserData = (auth, userId, email, login) => ({
    type: SET_USER_DATA, payload: {userId, isAuth: auth, email, login}
})

export const deleteUserData = () => ({
    type: DELETE_USER_DATA
})

export const getAuthUserData = () => async (dispatch) => {
    try {
        const token = localStorage.getItem("token")
        if (!token) {
            return dispatch(setUserData(false, null, null))
        }
        let response = await authAPI.me(token)
        dispatch(setUserData(true, response.data.userId, response.data.email))
    } catch (e) {
        if (e.response.status === 401) {
            localStorage.removeItem('token')
            return dispatch(setUserData(false, null, null))
        }
    }
}


export const registerUser = (em, password) => async (dispatch) => {
    try {
        let response = await authAPI.register(em, password)
        return {message: response.data.message, error: false}
    } catch (e) {
        return {message: e.response.data.message, error: true}
    }
}

export const loginUser = (em, password) => async (dispatch) => {
    try {
        let response = await authAPI.login(em, password)
        let {token, userId, email} = response.data
        localStorage.setItem("token", token)
        dispatch(setUserData(true, userId, email))
        return {message: response.data.message, error: false}
    } catch (e) {
        return {message: e.response.data.message, error: true}
    }
}

export default authReducer;