import {questionsAPI} from "../Api/api";

const SET_QUESTION_DATA = "SET_QUESTION_DATA"
const SET_ANSWERS = "SET_ANSWERS"
const SET_LOADING = "SET_LOADING"
const ADD_ANSWER = "ADD_ANSWER"

let initialState = {
    question: {
        title: null,
        text: null,
        likes: null,
        author: null,
        date: null,
    },
    answers: [
        // {
        //     author: "author",
        //     date: "",
        //     likes: 10,
        //     text: "Lorem fsgdfsg dfg dfg fdg fdg fdg fdg fdgfdgfdgfd",
        //     id: "321321321"
        // },
    ],
    isLoading: false,
}


const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_QUESTION_DATA: {
            return {
                ...state,
                question: {...action.payload},
                answers: action.answers

            }
        }
        case SET_ANSWERS : {
            return {
                ...state,
                answers: action.answers,

            }
        }
        case ADD_ANSWER: {
            debugger
            return {
                ...state,
                answers: [... state.answers, {...action.payload.answer, author: {...action.payload.author}, likes: 0}]
            }
        }
        case SET_LOADING: {
            return {
                ...state,
                isLoading: !state.isLoading
            }
        }
        default: return state
    }
}

const setQuestionData = (title, text, likes, author, date, answers) => ({
    type: SET_QUESTION_DATA, payload: {title, text, likes, author, date}, answers
})

const toggleLoading = () => ({
    type: SET_LOADING,
})

const addComment = (answer, author) => ({
    type: ADD_ANSWER, payload: {answer, author}
})

const setAnswers = (answers) => ({
    type: SET_ANSWERS, answers
})


export const getQuestionData = (id) => async (dispatch) => {
    try {
        dispatch(toggleLoading())
        let response = await questionsAPI.getQuestion(id)
        dispatch(toggleLoading())
        const {title, text, likes, author, date, answers} = response.data
        dispatch(setQuestionData(title, text, likes, author.email, date, answers ))
    }catch (e) {
        dispatch(setQuestionData(null, null, null, null, null))
        console.log(e)
    }
}

export const postAnswerThunk = (text) => async (dispatch) => {
    try {
        let response = await questionsAPI.postAnswer(text)
        if (response.status === 200) {
            const {answer, author} = response.data
            dispatch(addComment(answer, author))
        }
    } catch (e) {
        console.log(e)
    }
}


export default questionReducer;