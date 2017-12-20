import React from 'react';
import { Modal, Input, Button, Row, Col, Preloader } from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserLevelListAction } from
  '../../../../actions/admin/getUserLevelList';
import { changeUserLevelAction } from
  '../../../../actions/admin/changeUserLevel';
import { getUserListAction } from '../../../../actions/admin/getUserList';

/**
 *
 *
 * @class ChangeUserLevelModal
 *
 * @extends {React.Component}
 */
class ChangeUserLevelModal extends React.Component {
  /**
   * Creates an instance of ChangeUserLevelModal
   *
   * @param {object} props
   *
   * @memberOf ChangeUserLvlModal
   */
  constructor(props) {
    super(props);
    this.state = {
      newLevelId: '',
      userLevel: '',

    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  /**
   *
   * @returns {function} ChangeUserLevelModal
   *
   * @memberof componentDidMount
   *
   * @memberOf ChangeUserLvlModal
   */
  componentDidMount() {
    this.props.getUserLevelListAction();
  }
  /**
   * @param {object} nextProps
   *
   * @memberof ChangeUserLevelModal
   *
   * @returns {void} value
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      userLevel: nextProps.selectedUser.userLevel
    });
  }

  /**
   *
   *
   *
   * @param {object} event
   *
   * @returns {object} state
   *
   * @memberOf ChangeUserLvlModal
   */
  onChange(event) {
    event.preventDefault();
    this.setState({
      newLevelId: event.target.value
    });
  }
  /**
   *
   *
   * @param {event} event
   *
   * @returns {object} function
   *
   * @memberof ChangeUserLvlModal
   *
   */
  onClick(event) {
    event.preventDefault();
    this.props.changeUserLevelAction({
      newLevelId: this.state.newLevelId,
      userId: this.props.selectedUser.id
    })
      .then(() => {
        this.setState({
          userLevel: this.state.newLevelId
        });
        this.props
          .getUserListAction(0, 5);
        this.setState({
          newLevelId: ''
        });
      });
  }

  /**
   *
   *
   *
   * @memberof ChangeUserLevelModal
   *
   * @returns {Component} Compent
   *
   * @memberOf ChangeUserLevelModal
   */
  render() {
    if (!this.props.userLevels) {
      return (<Preloader size="big" className="center-align" />);
    }
    const userLevelNames = this.props.userLevels
      .map(userLevel => (
        <option
          value={userLevel.level}
          className="black-text"
          key={userLevel.level}
        >
          {userLevel.levelName}
        </option>

      ));
    return (
      <Modal
        id="change-user-level-modal"
        header="Change User Level"
      >
        <div className="change-level-modal">
          <Row>
            <div className="disabled">
              <img
                src={this.props.selectedUser.bookImage}
                alt={this.props.selectedUser.title}
              />
              <h5> Username : &nbsp;{this.props.selectedUser.username}
              </h5>
            </div>
          </Row>
          <Row>
            <div className="disabled">
              <h5> Current Userlevel : &nbsp;{this.state.userLevel}
              </h5>
            </div>
          </Row>
          <Row>
            <Col>
              <h5> Change User Level :</h5>
            </Col>
            <Col l={8}>
              <Input l={8} type="select" onChange={this.onChange}>
                <option
                  value=""
                >
                Choose a New level
                </option>

                {[...userLevelNames]}
              </Input>
            </Col>

          </Row>
          <Row>
            <div className="user-level-info">
              <p>Text about the level goes here</p>
              <Button onClick={this.onClick}>Update Level</Button>
            </div>
          </Row>

        </div>
      </Modal>

    );
  }
}


ChangeUserLevelModal.defaultProps = {
  selectedUser: [],
  userLevels: []
};

ChangeUserLevelModal.propTypes = {
  userLevels: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ]),
  selectedUser: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ]),
  getUserListAction: PropTypes.func.isRequired,
  changeUserLevelAction: PropTypes.func.isRequired,
  getUserLevelListAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userLevels: (state.userReducer.userLevels)
    ? state.userReducer.userLevels.userLevels : [],
  selectedUser: (state.userReducer.selectedUser)
    ? state.userReducer.selectedUser.user : []
});

export default connect(
  mapStateToProps,
  {
    getUserLevelListAction,
    changeUserLevelAction,
    getUserListAction
  }
)(ChangeUserLevelModal);
