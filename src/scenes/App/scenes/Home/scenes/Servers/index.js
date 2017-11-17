import React, {PropTypes as P} from 'react'
import {Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import {loadServers} from './services/servers/actions'
import ServerItem from './components/ServerItem'

import './styles.styl'


class Servers extends React.Component {
  componentDidMount() {
    this.props.loadServers()
  }
  render() {
    if (!this.props.data || this.props.fetching) {
      return <div>Loading...</div>
    }
    var totalPlayers = 0
    return (
      <div className="Home-Servers">
        <table className="Home-Servers-list">
          <tbody>
            {this.props.data.map((server, idx) => {
              if (!server) {
                return
              }
              const serverInfo = server.get('server_info')
              const gameInfo = server.get('game_info')
              if (serverInfo.get('hidden')) {
                return
              }
              if (gameInfo) {
                totalPlayers += gameInfo.get('users').size
              }
              return (
                <ServerItem key={idx} serverInfo={serverInfo} gameInfo={gameInfo} />
              )
            })}
          </tbody>
        </table>
        <span className="text-muted">{totalPlayers} player(s) online</span>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {fetching, error, data} = state.servers
  return (
    { fetching
    , error
    , data
    })
}


export default connect(
  mapStateToProps,
  {loadServers}
)(Servers)
