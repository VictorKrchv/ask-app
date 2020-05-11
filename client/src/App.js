import React, {useEffect} from 'react';
import './App.scss';
import {Header} from "./Components/Header";
import {MainPage} from "./Components/MainPage/MainPage";
import {Redirect, Route, Switch} from "react-router-dom";
import {QuestionPage} from "./Components/QuestionPage/QuestionPage";
import {AskPage} from "./Components/AskPage/askPage";
import {AuthPage} from "./Components/AuthPage/AuthPage";
import Loader from "./Components/Loader";
import {useDispatch, useSelector} from "react-redux";
import {getAuthUserData} from "./Redux/auth-reducer";

function App() {


    const ready = useSelector(state => state.auth.ready)
    const isAuth = useSelector(state => state.auth.isAuth)
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(getAuthUserData())
    }, [dispatch])


    if (!ready) {
        return (
            <div className="container">
                <Loader/>
            </div>
        )
    }

    return (
            <div>
                <Header/>
                <div className="content">
                    <div className="container">
                       <div className="content-inner">
                           {isAuth
                           ?
                               <Switch>
                                   <Route path="/" exact>
                                       <MainPage/>
                                   </Route>
                                   <Route path="/question/:id" exact>
                                       <QuestionPage/>
                                   </Route>
                                   <Route path="/ask" exact>
                                       <AskPage/>
                                   </Route>
                                   <Redirect to="/"/>
                               </Switch>

                           :  <Switch>
                                   <Route path="/" exact>
                                       <MainPage/>
                                   </Route>
                                   <Route path="/question/:id" exact>
                                       <QuestionPage/>
                                   </Route>
                                   <Route path="/auth/:id" exact>
                                       <AuthPage/>
                                   </Route>
                                   <Redirect to="/"/>
                               </Switch> }
                       </div>
                    </div>
                </div>
            </div>

    );
}

export default App;
