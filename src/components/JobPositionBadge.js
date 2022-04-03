import React from 'react'
import Box from './Box'
import Label from './Label'
import { TYPES } from '../helpers/constants'

const JobPositionBadge = ({ type, ...props }) => {
  return <Box
    width={80}
    py={4}
    border={1}
    borderRadius={3}
    style={[TYPES[type].containerStyle]}
    {...props}
  >
    <Label fontSize={10} style={[TYPES[type].textStyle]} textAlign="center">{TYPES[type].name}</Label>
  </Box>
}

export default JobPositionBadge