
import React, { Component, Fragment } from 'react'
import { render } from 'react-dom'
import { random } from 'lodash'

import { Tilemap, StaticMap } from '../src/tilemap'

const generate = (size) => {
  return new Array(size[0] * size[1])
    .fill(0)
    .map(() => random(0, 1))
}

const size = [32, 32]
// const size = [8, 8]
var map = generate(size)
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

const TICK = 1000 / 8

class Button extends Component {
  shouldComponentUpdate (props, state) {
    return true
  }

  render () {
    const { onClick } = this.props
    return (
      <button onClick={onClick}>{this.props.children}</button>
    )
  }
}

class Root extends Component {
  state = {
    isPaused: true,
    map: generate(size),
    index: 0
  }

  onTick = () => {
    // this.state.map[random(0, size[0] * size[1])] = random(0, 1)
    this.setState(s => ({
      ...s,
      map: generate(size)
      // index: ++s.index
    }))
    if (!this.state.isPaused) {
      setTimeout(this.onTick, TICK)
    }
  }

  onStart = () => {
    setTimeout(this.onTick, TICK)
    this.setState(s => ({
      ...s,
      isPaused: false
    }))
  }

  onStop = () => {
    this.setState(s => ({
      ...s,
      isPaused: true
    }))
  }

  render () {
    const { isPaused } = this.state
    return (
      <Fragment>
        <Button onClick={isPaused ? this.onStart : this.onStop}>
          {isPaused ? 'Start' : 'Stop'}
        </Button>
        {!isPaused && <Tilemap
          mapSize={size}
          data={this.state.map}
          toTile={toTile}
          tileSize={[10, 10]}
        />}
      </Fragment>
    )

    // return this.state.isPaused
    //   ? <Button onClick={this.onStart}>Start</Button>
    //   : <Fragment>
    //     <Button onClick={this.onStop}>Stop</Button>
    //     <Tilemap
    //       mapSize={size}
    //       data={this.state.map}
    //       toTile={toTile}
    //       tileSize={[10, 10]}
    //     />
    //   </Fragment>
  }
}

var el = document.createElement('div')
document.body.appendChild(el)
render(
  <Root />
  , el
)
