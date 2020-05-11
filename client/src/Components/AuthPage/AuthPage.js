import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom"
import {useDispatch} from "react-redux";
import {loginUser, registerUser} from "../../Redux/auth-reducer";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import Alert from "react-bootstrap/Alert";


export const AuthPage = () => {


    const history = useHistory()
    const id = useParams().id
    const dispatch = useDispatch()



    const [form, setForm] = useState({
        email: '',
        password: '',
        repassword: ''
    })

    const [message, setMessage] = useState({error: null, message: ''})



    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        setForm({email: '', password: '', repassword: ''})
    }, [id])

    const registerHandler = async (e) => {
        e.preventDefault()
        let {message, error} = await dispatch(registerUser(form.email, form.password))
        setMessage({message, error})
    }

    const loginHandler = async (e) => {
        e.preventDefault()
        let {error} = await dispatch(loginUser(form.email, form.password))
        if (!error) {
            history.push('/')
        }
    }


    if (id === "login") {
        return (

            <div className="auth">
                <div className="auth-title">
                    <div><h3>Login</h3></div>
                    <div><Link to="/auth/register">No account?</Link></div>
                </div>
                {message.message
                && <Alert variant={!message.error ? 'success' : 'danger'} onClose={() => setMessage({error: null, message:null})} dismissible>
                    {message.error ? <Alert.Heading>Oh snap! You got an error!</Alert.Heading>: null}
                    <p>
                        {message.message}
                    </p>
                </Alert>
                }

                <Form onSubmit={loginHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" onChange={changeHandler} value={form.email} type="email"
                                      placeholder="Enter email"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" onChange={changeHandler} value={form.password} type="password"
                                      placeholder="Password"/>
                    </Form.Group>

                    <Button className="btn" type="submit">Login</Button>
                </Form>

            </div>
        )
    } else if (id === "register") {
        return (

            <div className="auth">
                <div className="auth-title">
                    <div><h3>Register</h3></div>
                    <div><Link to="/auth/login">Have an account?</Link></div>
                </div>
                {message.message
                && <Alert variant={!message.error ? 'success' : 'danger'} onClose={() => setMessage({error: null, message:null})} dismissible>
                    {message.error ? <Alert.Heading>Oh snap! You got an error!</Alert.Heading>: null}
                    <p>
                        {message.message}
                    </p>
                </Alert>
                }
                <Form action="" onSubmit={registerHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" onChange={changeHandler} value={form.email} type="email"
                                      placeholder="Enter email"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" onChange={changeHandler} value={form.password} type="password"
                                      placeholder="Password"/>
                    </Form.Group>

                    <Button className="btn" type="submit">Register</Button>
                </Form>


            </div>
        )
    }
}