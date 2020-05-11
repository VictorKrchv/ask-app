import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Question from "./Question";
import {fetchDeleteQuestion, getQuestions} from "../../Redux/questions-reducer";

export const MainPage = () => {

    const questions = useSelector(state => state.questions.questions)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getQuestions())
    }, [dispatch])

    const deleteQuestion = (id) => {
        dispatch(fetchDeleteQuestion(id))
    }

    const userId = useSelector(state => state.auth.userId)


    return (
        <div className="main">
            <div className="main-inner">
                {questions.map((question, index) => {
                    return (
                        <Question key={index} id={question.id} title={question.title} author={question.author.email}
                                  answers={question.answers}
                                  text={question.text} date={question.date} likes={question.likes}
                                  deleteQuestion={deleteQuestion}
                                  userId={userId}/>
                    )
                })}
            </div>
        </div>
    )
}