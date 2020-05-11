import React from "react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Dropdown} from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import {deleteUserData} from "../Redux/auth-reducer";

export const Header = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const isAuth = useSelector(state => state.auth.isAuth)
    const email = useSelector(state => state.auth.email)

    const logoutHandler = () => {
        localStorage.removeItem('token')
        dispatch(deleteUserData())
        history.push('/auth/login')
    }



    return (
        <div className="header">
            <div className="container">
                <div className="header-inner">
                    <div className="header-left">
                        <h3 className="header-title">
                            <Link to="/new">LOGO</Link>
                        </h3>
                        <nav className="header-nav">
                            <ul className="header-nav__list">
                                <li className="header-nav__item">
                                    <Link to="/new">Hot</Link>
                                </li>
                                <li className="header-nav__item">
                                    <Link to="/best">Best</Link>
                                </li>
                                {isAuth && <li className="header-nav__item">
                                    <Link to="/my">My questions</Link>
                                </li>}
                            </ul>
                        </nav>
                    </div>
                    <div className="header-right">
                        {isAuth && <li className="header-nav__item">
                            <Link to="/ask">Ask the question</Link>
                        </li>}
                        {isAuth
                            ? <DropdownButton id="dropdown-basic-button" variant="secondary" size="sm" title={email} className="header-right__btn" >
                            <Dropdown.Item as={Link} to="/">My question</Dropdown.Item>
                            <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                        </DropdownButton>
                            : <Link to={'/auth/login'} className='header-right__btn'>Login</Link>
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}