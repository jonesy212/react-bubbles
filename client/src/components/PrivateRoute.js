import React from 'react'
import { BrowserRouter as Route, Redirect } from "react-router-dom";


const PrivateRoute = ({component: Component, ...rest}) => {
    return(
        <Route
        {...rest}
        render= {props => {
            if(localStorage.getItem('token')){
                return <Component {...props}/>
            }
            return <Redirect to ='login'/>
        }}
        />

    )}

    export default PrivateRoute