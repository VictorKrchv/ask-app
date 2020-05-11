import React from "react";
import {Answer} from "./Answer";

export const AnswersList = React.memo(({answers}) => {

    return (
        <div className="answers">
            <div className="answers-title">
                <h3>Answers({answers.length}):</h3>
            </div>
            <hr/>

            {answers.map(answer => {
                return (
                    <Answer key={answer.id} date={answer.date} text={answer.text} likes={answer.likes} author={answer.author} />
                )
            })}
        </div>
    )
})