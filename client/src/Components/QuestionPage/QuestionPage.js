import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom"
import {getQuestionData} from "../../Redux/question-reducer";
import {Question} from "./Question";
import {AnswersList} from "./Answers/AnswersList";
import {QuestionForm} from "./QuestionForm";
import Loader from "../Loader";

export const QuestionPage = React.memo( () => {

    const dispatch = useDispatch()
    const id = useParams().id


    useEffect(() => {
        dispatch(getQuestionData(id))
    }, [dispatch, id])

    const questionState = useSelector(state => state.question)

    const postComment = (value) => {
        console.log(value)
    }

    if (questionState.isLoading) {
        return <Loader/>
    }

    return (
        <div className="question">
            <Question text={questionState.question.text} title={questionState.question.title}
                      likes={questionState.question.likes} author={questionState.question.author}
                      date={questionState.question.date} answers={questionState.answers.length}/>
            <QuestionForm postComment={postComment}/>
            <AnswersList answers={questionState.answers}/>
        </div>
    )
})