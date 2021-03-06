import React from 'react';
import { Row } from 'react-materialize';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SideNav from '../presentation/common/SideNav/index';
import DisplayAllBorrowedBooks from
  '../container/booklist/DisplayBorrowedBooks';
import DisplayAllBooks from '../container/booklist/DisplayAllBooks';
import LoanHistoryTable from '../container/loanhistory/LoanHistory';
import DisplayOverdueBooks from '../container/booklist/DisplayOverdueBooks';
import GetDashboardWrapper from '../container/common/Dashboard';


/**
 * @description Show User Dashboard
 *
 * @class DashboardView
 *
 * @param {object} props
 *
 */
class UserDashboard extends React.PureComponent {
  /**
   *
   *
   * @returns {Component} Userboard
   *
   * @memberOf UserDashboard
   */
  render() {
    return (
      <div>
        <div className="main-wrapper">
          <SideNav
            {...this.props}
          />
          <div className="main-text">
            <Tabs>
              <Row>
                <TabList>
                  <Tab>ALL BOOKS</Tab>
                  <Tab>DASHBOARD</Tab>
                  <Tab>BOOKS OVERDUE</Tab>
                  <Tab>LOAN HISTORY</Tab>
                </TabList>
              </Row>
              <Row>
                <TabPanel>
                  <DisplayAllBooks />
                </TabPanel>
                <TabPanel>
                  <DisplayAllBorrowedBooks />
                </TabPanel>
                <TabPanel>
                  <DisplayOverdueBooks />
                </TabPanel>
                <TabPanel>
                  <LoanHistoryTable />
                </TabPanel>
              </Row>
            </Tabs>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

const ClientDashboard = GetDashboardWrapper(UserDashboard);


export default ClientDashboard;
