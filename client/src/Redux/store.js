import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk"
import authReducer from './auth-reducer'
import questionsReducer from './questions-reducer'
import questionReducer from './question-reducer'

let reducers = combineReducers({
    auth: authReducer,
    questions: questionsReducer,
    question: questionReducer
})

let store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);

window.store = store

export default store