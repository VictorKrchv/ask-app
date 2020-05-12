import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";

export const QuestionForm = React.memo(({postAnswer}) => {

    const [value, setValue] = useState('')


    const onSubmit = (e) => {
        e.preventDefault()
        postAnswer(value)
    }

    return (
        <Form action="" className="question-form" onSubmit={onSubmit}>
            <div className="question-form__title">
                <h3>Answer the question</h3>
            </div>
            <div className="question-form__content">

                {/*<div className="question-form__img">*/}
                {/*    <img src="https://via.placeholder.com/50" alt=""/>*/}
                {/*</div>*/}

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Write your answer here</Form.Label>
                    <Form.Control as="textarea" rows="3" value={value} onChange={(e) => setValue(e.target.value)} />
                </Form.Group>

                    <Button size={"sm"} className="btn" type={"submit"}>Send answer</Button>

            </div>
        </Form>

    )
})
