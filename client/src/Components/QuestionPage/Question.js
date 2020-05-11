import React from "react";

export const Question = ({title, author, date, text, likes, answers}) => {

    return (

            <div className="question-content">
                <div className="question-title">
                    <h3>{title}</h3>
                </div>
                <div className="question-subtitle">
                    {author} at <span>{date}</span>
                </div>
                <p className="question-text">
                    {text}
                </p>
                <div className="question-footer">
                    <span>Likes: {likes}</span>
                    <span>Answers: {answers}</span>
                </div>
            </div>
    )
}