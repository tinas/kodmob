import React from 'react'

import Box from './Box'
import Label from './Label'

const Logo = ({ fontSize = 24, ...props }) => {
  return (
    <Box {...props}>
      <Box flexDirection="row">
        <Label color="green" fontSize={fontSize}>
          {'{'}
        </Label>
        <Label color="primaryText" fontSize={fontSize}>
          {' kod'}
        </Label>
        <Label color="green" fontSize={fontSize}>
          ,
        </Label>
        <Label color="primaryText" fontSize={fontSize}>
          {' ilan '}
        </Label>
        <Label color="green" fontSize={fontSize}>
          {'}'}
        </Label>
      </Box>
    </Box>
  )
}

export default Logo