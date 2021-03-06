import React from 'react'
import {connect} from 'react-redux'
import {loadMapOverview, selectVideo,
        fetchLeaderboard} from './services/mapOverview/actions'

import Tooltip from 'react-bootstrap/lib/Tooltip'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'

import DocumentTitle from 'react-document-title'

import Video from './components/Video'
import Throbber from 'root/components/Throbber'
import LeaderboardContainer from './components/LeaderboardContainer'

import './styles.styl'


class MapOverview extends React.Component {
  componentDidMount() {
    this.props.loadMapOverview(this.props.match.params.name)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.name !== this.props.match.params.name) {
      this.props.loadMapOverview(nextProps.match.params.name)
    }
  }

  renderAuthor() {
    const authors = this.props.data.get('authors')
    const authorNames = authors.map((a) => a.get('name'))

    let authorItem
    if (authorNames.size === 0) {
      authorItem = <span style={{borderBottom: '1px dotted white'}}>N/A</span>
    }
    else if (authorNames.size === 1) {
      authorItem = authorNames.get(0)
    }
    else {
      const tooltip = (
        <Tooltip>
          {authorNames.map((name, idx) => {
            return (
              <span key={idx}>{name}<br /></span>
            )
          })}
        </Tooltip>
      )
      authorItem = (
        <OverlayTrigger placement="bottom" overlay={tooltip}>
          <span style={{borderBottom: '1px dotted rgb(170, 170, 170)'}}>
            Multiple Authors
          </span>
        </OverlayTrigger>
      )
    }
    return (
      <span>{authorItem}</span>
    )
  }

  renderVideoButtons() {
    const videos = this.props.data.get('videos')
    let content
    if (videos.keys().size === 0) {
      content = 'N/A'
    }
    else {
      content = ['soldier', 'demoman'].map((c, idx) => {
        const video = videos.get(c)
        if (video) {
          return <span key={idx}
                       className={'video-button tf-icon sm ' + c}
                       onClick={() => this.props.selectVideo(video)} />
        }
        else {
          return <span key={idx}
                       className={'video-button disabled tf-icon sm ' + c}
                       style={{opacity: '0.3', cursor: 'not-allowed'}} />
        }
      })
    }
    return (
      <span className="MapOverview-header-video-buttons">
        {content} <i className="fa fa-fw fa-youtube" />
      </span>
    )
  }

  renderZoneCounts() {
    const zoneCounts = this.props.data.get('zone_counts')
    const courses = zoneCounts.get('course', 1)
    const bonuses = zoneCounts.get('bonus', 0)
    let courseString
    if (courses === 1) {
      courseString = courses + ' Course'
    }
    else {
      courseString = courses + ' Courses'
    }
    let bonusString
    if (bonuses === 0) {
      bonusString = 'No Bonuses'
    }
    else if (bonuses === 1) {
      bonusString = bonuses + ' Bonus'
    }
    else {
      bonusString = bonuses + ' Bonuses'
    }
    return (
      <div>

        <i className="fa fa-fw fa-flag" /> {courseString}
        <br />
        <i className="fa fa-fw fa-star" /> {bonusString}
      </div>
    )
  }

  onClickCloseVideo() {
    this.props.selectVideo(null)
  }

  onFetchLeaderboard(zoneType, index) {
    this.props.fetchLeaderboard(this.props.match.params.name, zoneType, index)
  }

  render() {
    const data = this.props.data
    if (this.props.fetching || !data) {
      return (
        <div className="container" style={{background: 'white'}}>
          <Throbber />
        </div>
      )
    }
    const {leaderboard} = this.props
    const mapName = data.getIn(['map_info', 'name'])
    const bgStyle = { backgroundImage: `url(http://tempus.site.nfoservers.com/web/screenshots/raw/${mapName}_1080p.jpeg)`
                    }
    // const bgStyle = {}
    return (
      <DocumentTitle title={`Tempus - ${mapName}`}>
        <div>
          <section className="MapOverview container">
            <div className="MapOverview-background" style={bgStyle}>
            </div>
            <header className="MapOverview-header">
              <div className="MapOverview-header-inner">
                <h1>
                  {data.getIn(['map_info', 'name'])} <br className="hidden-lg hidden-md" /> <small>by {this.renderAuthor()}</small>
                </h1>
                <span className="pull-right">
                  {this.renderVideoButtons()}
                </span>
                <p>
                  {this.renderZoneCounts()}
                </p>
                <a className="btn btn-primary" target="_blank"
                   href={`http://tempus.site.nfoservers.com/server/maps/${data.getIn(['map_info', 'name'])}.bsp.bz2`}>
                  <i className="fa fa-download" /> Download
                </a>
              </div>
            </header>
            <section className="MapOverview-body container">
              <Video selectedVideo={this.props.selectedVideo}
                     onClickCloseVideo={this.onClickCloseVideo.bind(this)} />
              <LeaderboardContainer data={data}
                                    leaderboard={leaderboard}
                                    fetchLeaderboard={this.onFetchLeaderboard.bind(this)} />
            </section>
          </section>
        </div>
      </DocumentTitle>
    )
  }
}


function mapStateToProps(state) {
  const {mapOverview} = state
  return mapOverview.toObject()
}


export default connect(
  mapStateToProps,
  {loadMapOverview, selectVideo, fetchLeaderboard}
)(MapOverview)
