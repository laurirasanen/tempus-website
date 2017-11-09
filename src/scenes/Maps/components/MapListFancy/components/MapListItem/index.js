import React from 'react'
import {Tooltip, OverlayTrigger} from 'react-bootstrap'
import {Link} from 'react-router'
import Difficulties from 'root/constants/Difficulties'
import LazyLoad from 'react-lazy-load';

import './styles.styl'


export default class MapListItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {showImage: false}
    this.imageUrl = `http://tempus.site.nfoservers.com/web/screenshots/raw/${this.props.data.get('name')}_320p.jpeg`
    this.image = new Image()
    this.image.onload = this.onImageLoaded.bind(this)
    this.image.src = this.imageUrl
  }

  onImageLoaded() {
    this.setState({showImage: true})
  }

  renderTiers() {
    const item = this.props.data
    const soldierTier = item.getIn(['tier_info', '3'])
    const demomanTier = item.getIn(['tier_info', '4'])
    return (
      <span className="tiers">
        <span className="tier">
          <span className="tf-icon soldier mini">
          </span>
          <span className={'tier-inner tier-' + soldierTier}>
            {soldierTier === 0
             ? <i className="fa fa-ban" />
             : 'T' + soldierTier
             }
          </span>
        </span>
        <span> </span>
        <span className="tier">
          <span className="tf-icon demoman mini">
          </span>
          <span className={'tier-inner tier-' + demomanTier}>
            {demomanTier === 0
             ? <i className="fa fa-ban" />
             : 'T' + demomanTier
             }
          </span>
        </span>
      </span>
    )
  }

  render() {
    const name = this.props.data.get('name')
    let bgStyles =
      { backgroundImage: `url(${this.imageUrl})`
      , opacity: this.state.showImage ? 100 : 0
      }
      // { backgroundImage: `url(http://tempus.site.nfoservers.com/web/screenshots/raw/${name}_320p.jpeg)`
    const url = '/maps/' + this.props.data.get('name')
    return (
      <Link to={url} className="Maps-MapListFancy-MapListItem">
        <LazyLoad height={90}>
          <span>
            <div className="item-background"
                 style={bgStyles} />
            <span className="item-overlay">
              <span className="item-inner">
                <span className="name-container clearfix">
                  <span className="name">
                    {this.props.data.get('name')}
                  </span>
                </span>
                {this.renderTiers()}
              </span>
            </span>
          </span>
        </LazyLoad>
      </Link>
    )
  }
}
