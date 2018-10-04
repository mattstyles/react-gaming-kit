
import { storiesOf } from '@storybook/react'
import { View } from 'react-basic-kit'

import { Sprite } from './sprite'

import sheet from '../assets/charb.png'

storiesOf('Sprite', module)
  .add('Basic', () => (
    <View>
      <Sprite
        url={sheet}
        scale={2}
      />
    </View>
  ))
  .add('Absolute', () => (
    <View>
      <Sprite
        url={sheet}
        scale={8}
        size={8}
        u={1}
        v={1}
        x={100}
        y={200}
      />
    </View>
  ))
