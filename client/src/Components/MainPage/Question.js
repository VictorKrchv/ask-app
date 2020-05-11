import React from "react";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import deleteIcon from "../../assets/images/delete-icon.svg"

const Question = React.memo(({id, title, date, author, text, likes, answers, deleteQuestion, userId}) => {
    return (
        <div key={id} className="main-question">
            {userId !== id
            ? <Button size={"sm"} variant="outline-danger" onClick={() => deleteQuestion(id)} className="main-question__btn"><img src={deleteIcon} alt=""/></Button>
            : null}
            <div className="main-question__title">
                <Link to={`/question/${id}`} >{title}</Link>
            </div>
            <div className="main-question__subtitle">
                <p>{author} <span className="main-question__date">at {date}</span></p>
            </div>
            <div className="main-question__text">
                <p>{text}
                </p>
            </div>
            <div className="main-question__footer">
                <span>Likes: {likes} </span>
                <span>Answers: {answers}</span>
            </div>
        </div>
    )
})

export default Question