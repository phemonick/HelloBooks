import React from 'react';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import PropTypes from 'prop-types';
import { getUserListAction } from '../../../../actions/admin/getUserList';
import PaginationWrapper from '../../common/Pagination.jsx';
import UserListTable from '../UserListTable.jsx';


/**
 * handles the state of the User List table
 * @class Userlists
 * @extends {React.Component}
 */
class UserList extends React.Component {
  /**
   * @description dispatch actions that help populate the admin dashboard with userlists
   * @method componentDidMount
   * @memberof UserLists
   * @returns {void}
   */
  componentDidMount() {
    this.props
      .getUserListAction(this.props.offset, this.props.limit);
  }
  /**
   * render User Lists component
   * @method render
   * @member UserLists
   * @returns {object} component
   */
  render() {
    if (!this.props.userList) {
      return <Preloader size="big" className="center-align" />;
    }
    const { pagination } = this.props.userList;
    const config = {
      items: pagination.pageCount,
      activePage: pagination.page
    };
    return (
      <div>
        <UserListTable users={this.props.userList.users} />
        <PaginationWrapper
          config={config}
          fetch={this.props.getUserListAction}
          numberOfRecords={this.props.limit}
        />
      </div>
    );
  }
}

UserList.propTypes = {
  userList: PropTypes.PropTypes.shape({
    id: PropTypes.number,
    map: PropTypes.object,
    pagination: PropTypes.object,
    users: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
    }))
  }),
  getUserListAction: PropTypes.func.isRequired

};


UserList.defaultProps = {
  userList: null,
  limit: 5,
  offset: 0
};

UserList.propTypes = {
  limit: PropTypes.number,
  offset: PropTypes.number
};

const mapStateToProps = state => ({
  userList: state.userReducer.userList
});

export default connect(mapStateToProps, { getUserListAction })(UserList);

