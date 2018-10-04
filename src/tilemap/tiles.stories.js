
import React, { Fragment, Component } from 'react'
import { storiesOf } from '@storybook/react'
import { random } from 'lodash'

import { Tilemap } from './tiles'

// const map = [
//   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//   1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,
//   1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,
//   1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,
//   1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,
//   1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,
//   1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,
//   1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1,
//   1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1,
//   1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
//   1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,
//   1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,
//   1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,
//   1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,
//   1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1,
//   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
// ]

const jiggleTilemap = (data) => {
  data[random(0, size[0] * size[1])] = data[random(0, size[0] * size[1])] === 0
    ? 1
    : 0

  return data
}

const generate = (size) => {
  return new Array(size[0] * size[1])
    .fill(0)
    .map(() => random(0, 1))
}

const size = [32, 32]
const map = generate(size)
const toTile = ({ tile, position: [x, y], index }) => {
  const char = tile === 1 ? '#' : ' '
  return (
    <span key={index} style={{
      position: 'absolute',
      top: `${y * 10}px`,
      left: `${x * 10}px`,
      color: `${tile === 1 ? 'rgb(84, 98, 94)' : 'white'}`
    }}>
      {char}
    </span>
  )
}

class RefreshTileMap extends Component {
  state = {
    data: [...map]
  }

  onJiggle = () => {
    this.setState(state => ({
      data: jiggleTilemap(state.data)
    }))
  }

  onRecreate = () => {
    this.setState(state => ({
      data: generate(size)
    }))
  }

  render () {
    return (
      <Fragment>
        <div style={{ position: 'absolute', top: '180px' }}>
          <button onClick={this.onJiggle}>Refresh</button>
          <button onClick={this.onRecreate}>Recreate</button>
        </div>
        <Tilemap
          mapSize={size}
          data={this.state.data}
          toTile={toTile}
          tileSize={[10, 10]}
        />
      </Fragment>
    )
  }
}

storiesOf('Tiles', module)
  .add('Tile map', () => (
    <Tilemap
      mapSize={size}
      data={map}
      toTile={toTile}
      tileSize={[10, 10]}
    />
  ))
  .add('Refreshing', () => <RefreshTileMap />)
