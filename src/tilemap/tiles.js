
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const to1d = (width) => (x, y) => y + x * width
export const to2d = (width) => (index) => ([
  index % width,
  index / width | 0
])

const TileContainer = styled('div')`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: relative;
`
TileContainer.defaultProps = {
  width: 0,
  height: 0
}

export const Tilemap = ({
  data,
  mapSize,
  toTile,
  tileSize
}) => {
  const convert = to2d(mapSize[0])
  const tiles = data.map((tile, i) => toTile({
    tile,
    position: convert(i),
    index: i
  }))

  return (
    <TileContainer
      width={mapSize[0] * tileSize[0]}
      height={mapSize[1] * tileSize[1]}
    >{tiles}</TileContainer>
  )
}
Tilemap.propTypes = {
  data: PropTypes.array,
  mapSize: PropTypes.array,
  toTile: PropTypes.func,
  tileSize: PropTypes.array
}
Tilemap.defaultProps = {
  mapSize: [1, 1],
  toTile: function noTilingFunc () {},
  tileSize: [1, 1]
}
