
import React, { Fragment, Component } from 'react'
import { storiesOf } from '@storybook/react'
import { random } from 'lodash'

import { Tilemap } from './tiles'
import { Sprite } from '../sprite'

import sheet from '../../assets/charb.png'

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

const repeat = (num, fn) => {
  if (num <= 0) return

  while (--num) {
    fn()
  }
}

const jiggleTilemap = (data) => {
  // data[random(0, size[0] * size[1])] = data[random(0, size[0] * size[1])] === 0
  //   ? 1
  //   : 0

  repeat(25, () => {
    const rnd = random(0, size[0] * size[1])
    data[rnd] = data[rnd] === 0 ? 1 : 0
  })

  return data
}

const generate = (size) => {
  return new Array(size[0] * size[1])
    .fill(0)
    .map(() => random(0, 1))
}

// const size = [32, 32]
const size = [8, 8]
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
    data: map
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
        <div style={{ position: 'absolute', top: '380px' }}>
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

class SmallSwitcher extends Component {
  state = {
    text: 'world'
  }

  onClick = event => {
    this.setState(s => ({
      text: s.text === 'world' ? 'switch' : 'world'
    }))
  }

  render () {
    return (
      <div
        style={{ padding: '4px 18px', background: 'rgb(244, 244, 244)' }}
        onClick={this.onClick}
      >
        <h3>{`hello ${this.state.text}`}</h3>
      </div>
    )
  }
}

class FPSGen extends Component {
  state = {
    data: generate(size)
  }

  tick = null

  onTick = () => {
    this.setState(state => ({
      data: generate(size)
    }))

    this.tick = window.requestAnimationFrame(this.onTick)
    // this.tick = setTimeout(this.onTick, 1000 / 60)
  }

  componentDidMount () {
    this.onTick()
  }

  componentWillUnmount () {
    if (this.tick) {
      window.cancelAnimationFrame(this.tick)
      // clearTimeout(this.tick)
    }
  }

  render () {
    return (
      <Tilemap
        mapSize={size}
        data={this.state.data}
        toTile={toTile}
        tileSize={[10, 10]}
      />
    )
  }
}

const toSprite = ({ tile, position: [x, y], index }) => {
  const scale = 4
  const size = 8
  const padding = 12
  return (
    <Sprite
      url={sheet}
      scale={scale}
      size={8}
      u={tile}
      v={tile}
      x={x * size * scale + padding}
      y={y * size * scale + padding}
    />
  )
}

storiesOf('Tiles', module)
  .add('Tile map', () => (
    <Fragment>
      <Tilemap
        mapSize={size}
        data={map}
        toTile={toTile}
        tileSize={[10, 10]}
      />
      <SmallSwitcher />
    </Fragment>
  ))
  .add('Tile map - sprites', () => (
    <Tilemap
      mapSize={size}
      data={map}
      toTile={toSprite}
      tileSize={[8, 8]}
    />
  ))
  .add('Refreshing', () => <RefreshTileMap />)
  .add('Refresh Switch', () => (
    <div>
      <RefreshTileMap />
      <SmallSwitcher />
    </div>
  ))
  .add('Refresh Tick', () => <FPSGen />)
