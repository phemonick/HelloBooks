import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row } from 'react-materialize';
import { logout } from '../../../actions/authenticate';

/**
 * handles logging a user out
 *
 * @class Logout
 *
 * @extends {Component}
 */
class Logout extends Component {
/**
   * @description redirects the user to the index page
   *
   * @memberof Logout
   *
   * @return {[type]} [description]
   */
  componentDidMount() {
    this.props.logout();
    /* eslint-disable */
      Materialize.toast("User Logging Out", 2500);
    this.props.history.push('/');
  }
  /**
   * renders component to DOM
   *
   * @memberof Logout
   *
   * @return {JSX} JSX representation of DOM
   */
  render() {
    return (
      <Row className="center landing">
        <h1>
          Logging out...
        </h1>
      </Row>
    );
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};


export default connect(null, { logout })(Logout);
