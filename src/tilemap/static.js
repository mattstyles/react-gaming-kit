
import React, { Component } from 'react'

import { Tilemap } from './tiles'

export class StaticMap extends Component {
  shouldComponentUpdate () {
    return false
  }

  render () {
    return <Tilemap {...this.props} />
  }
}
