import React from 'react'
import Box from './Box'
import Label from './Label'

const JobTag = ({ tag, ...props }) => {
  return <Box border={0.5} borderColor="green" borderRadius={2} px={6} py={4} {...props}>
    <Label fontSize={8} color="green">{tag}</Label>
  </Box>
}

export default JobTag