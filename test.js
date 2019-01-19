
import { render } from 'react-dom'
import { random } from 'lodash'

import { Tilemap } from './src/tilemap/tiles'

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

var el = document.createElement('div')
document.body.appendChild(el)
render(
  <div>
    <h1>Georgia</h1>
    <Tilemap
      mapSize={size}
      data={map}
      toTile={toTile}
      tileSize={[10, 10]}
    />
  </div>
  , el
)
