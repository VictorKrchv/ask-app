import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {useDispatch} from "react-redux";
import {postQuestion} from "../../Redux/questions-reducer";
import {Form} from "react-bootstrap";
import {useHistory} from "react-router-dom"
import Alert from "react-bootstrap/Alert";

export const AskPage = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const [form, setForm] = useState({
        text: '',
        title: ''
    })
    const [alert, setAlert] = useState({
        error: null,
        message: ''
    })

    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }


    const onSumbit = async (e) => {
        e.preventDefault()
        if (form.text === '' || form.title === '') return false
        let {id, message, error} = await dispatch(postQuestion(form.title, form.text))
        if (error) return setAlert({message, error})
        history.push(`/question/${id}`)
    }

    return (
        <div className="ask">
            <div className="ask-title">
                <h1>Ask the question</h1>
                {alert.message
                && <Alert variant={!alert.error ? 'success' : 'danger'}
                          onClose={() => setAlert({error: null, message: null})} dismissible>
                    {alert.error ? <Alert.Heading>Oh snap! You got an error!</Alert.Heading> : null}
                    <p>
                        {alert.message}
                    </p>
                </Alert>
                }
            </div>

            <Form action="" className="ask-form" onSubmit={onSumbit}>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title" value={form.title} onChange={changeHandler} as="textarea" rows="1"/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Text</Form.Label>
                    <Form.Control name="text" value={form.text} onChange={changeHandler} as="textarea" rows="4"/>
                </Form.Group>
                <Button className="btn" type={"submit"}>Submit</Button>
            </Form>
        </div>
    )
}