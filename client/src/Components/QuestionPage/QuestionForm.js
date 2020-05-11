import React, {useState} from "react";
import Button from "react-bootstrap/Button";

export const QuestionForm = React.memo(({postComment}) => {

    const [value, setValue] = useState('')


    const onSubmit = (e) => {
        e.preventDefault()
        postComment(value)
    }

    return (
        <form action="" className="question-form" onSubmit={onSubmit}>
            <div className="question-form__title">
                <h3>Answer the question</h3>
            </div>
            <div className="question-form__content">

                {/*<div className="question-form__img">*/}
                {/*    <img src="https://via.placeholder.com/50" alt=""/>*/}
                {/*</div>*/}

                <div className="question-form__input" >
                    <textarea type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Write your answer here"/>
                    <Button size={"sm"} className="btn" type={"submit"}>Send answer</Button>
                </div>
            </div>
        </form>
    )
})
