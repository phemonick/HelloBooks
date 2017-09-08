import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route,Switch } from 'react-router-dom'




import {Root} from './components/Root'
import {LogIn} from './components/LogIn'
import {Register} from './components/Register'
import {Profile} from './components/Profile'


class App extends React.Component {

 render() {
  return (
    <Router>
      <Root>
          <Switch>
            <Route exact path={'/'} component={LogIn}/>
            <Route path={'/register'} component={Register}/>
            <Route path={'/profile'} component={Profile}/>
          </Switch>
      </Root>
   </Router>
  )
 }
}

render(<App/>,window.document.getElementById('app'))