import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';


const GuestRoutes = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (!isAuthenticated
    ? <Component{...props} />
    : <Redirect to="/dashboard" />)}
  />

);

GuestRoutes.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state =>
  ({
    isAuthenticated: state.userReducer.isAuthenticated
  });

export default connect(mapStateToProps)(GuestRoutes);