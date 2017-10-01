import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux'

/*
*
*Routes for Authenticated users
*/
const UserRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {

  return (

    <Route
      {...rest}
      render={(props) => isAuthenticated
      ? <Component{...props}/>
      : <Redirect to='/'/>}/>

  );

};

UserRoute.PropTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired,
  name: PropTypes.string

};

const mapStateToProps = (state) => {
  // if (!state.user.user.token || state.user.user.token === "") { //if there is
  // no token, dont bother     return ; } else {

  return {
    isAuthenticated: !!state.user.isAuthenticated
  };
  // }
}

export default connect(mapStateToProps)(UserRoute);