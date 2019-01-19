
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { isUndefined, prop } from 'lodash/fp'
import { mixins } from 'react-basic-kit'

const { pixellate } = mixins

const fromSheet = props => ([
  props.u * props.size,
  props.v * props.size
])

const setBackgroundPosition = props => {
  const uv = fromSheet(props)
  return css`background-position: -${uv[0]}px -${uv[1]}px;`
}

export const Sprite = styled('div')`
  display: inline-block;
  ${setBackgroundPosition}
  background-image: url('${prop('url')}');
  width: ${prop('size')}px;
  height: ${prop('size')}px;
  transform: scale(${prop('scale')});
  ${pixellate}

  ${props => (!isUndefined(props.x) || !isUndefined(props.y) || !isUndefined(props.z)) && css`
    position: absolute;
    transform: translate3d(${props => props.x || 0}px, ${props => props.y || 0}px, ${props => props.z || 0}px) scale(${prop('scale')});
  `}
`
Sprite.propsTypes = {
  // [u, v] for positioning in spritesheet
  u: PropTypes.number,
  v: PropTypes.number,
  // id for spritesheet
  url: PropTypes.string.isRequired,
  // size of image in spritesheet
  size: PropTypes.number,
  // scale to render at
  scale: PropTypes.number,
  // [x, y, z] position to render at
  x: PropTypes.number,
  y: PropTypes.number,
  z: PropTypes.number
}
Sprite.defaultProps = {
  u: 0,
  v: 0,
  size: 8,
  scale: 1
}
