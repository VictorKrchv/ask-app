import {questionsAPI} from "../Api/api";

const SET_QUESTIONS_DATA = 'SET_QUESTIONS_DATA'
const DELETE_QUESTION = "DELETE_QUESTION"


let initialState = {
    questions: [
        // {
        //     title: "title",
        //     author: 'author',
        //     text: 'text',
        //     id: '',
        //     likes: '10',
        //     comments: '4',
        //     date: new Date(2020, 2, 16, 14, 20, 1)
    ]
}


const questionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_QUESTIONS_DATA: {
            return {
                ...state,
                questions: action.questions
            }
        }
        case DELETE_QUESTION: {
            return {
                ...state,
                questions: state.questions.filter(question => {
                    return question.id !== action.id
                })
            }
        }
        default:
            return state
    }
}


const setQuestions = (questions) => ({
    type: SET_QUESTIONS_DATA, questions
})

const deleteQuestion = (id) => ({
    type: DELETE_QUESTION, id
})


export const getQuestions = () => async (dispatch) => {
    try {
        let response = await questionsAPI.getQuestions()

        dispatch(setQuestions(response.data.questions))
    } catch (e) {
        console.log(e)
    }
}

export const postQuestion = (title, text) => async (dispatch) => {
    try {
        let response = await questionsAPI.postQuestion(title, text)
        if (response.status === 201) return {id: response.data.question._id, message: "Success", error: null}
    }catch (e) {
        console.log(e.response)
        return {message: e.response.data.message, error: true}
    }
}

export const fetchDeleteQuestion = (id) => async (dispatch) => {
    try {
        let response = await questionsAPI.deleteQuestion(id)
        if (response.status === 204) {
            dispatch(deleteQuestion(id))
        }
    } catch (e) {
        console.log(e)
    }

}


export default questionsReducer;