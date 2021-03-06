import React from 'react'

import Activity from './scenes/Activity'
import Servers from './scenes/Servers'
import Server from './scenes/Server'
import {Route, Switch, NavLink, Redirect} from 'react-router-dom'

import './styles.styl'


export default class Home extends React.Component {
  render() {
    const {match} = this.props
    return (
      <div className="Home container">
        <div className="overview-header-container">
          <div className="header-image-container">
            <div className="header-image" />
          </div>
        </div>
        <nav className="Home-nav">
          <a>News</a>
          <NavLink to="/servers">Servers</NavLink>
          <NavLink to="/activity">Activity</NavLink>
          <a>About</a>
        </nav>
        <div className="Home-body">
          <div className="Home-content">
            <Route exact path="/" component={Servers} />
            <Route exact path="/servers" component={Servers} />
            <Route exact path="/servers/:id" component={Server} />
            <Route path="/activity" component={Activity} />
          </div>
        </div>
      </div>
    )
  }
}
