
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { isUndefined } from 'lodash/fp'
import { mixins } from 'react-basic-kit'

const { pixellate } = mixins

const fromSheet = props => ([
  props.u * props.size,
  props.v * props.size
])

export const Sprite = styled('div')`
  display: inline-block;
  background-position: -${props => fromSheet(props)[0]}px -${props => fromSheet(props)[1]}px;
  background-image: url('${props => props.url}');
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  transform: scale(${props => props.scale});
  ${pixellate}

  ${props => (!isUndefined(props.x) || !isUndefined(props.y) || !isUndefined(props.z)) && css`
    position: absolute;
    transform: translate3d(${props => props.x || 0}px, ${props => props.y || 0}px, ${props => props.z || 0}px) scale(${props => props.scale});
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
