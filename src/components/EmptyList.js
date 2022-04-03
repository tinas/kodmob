import React from 'react'
import Box from './Box'
import Label from './Label'
import theme from '../helpers/theme'
import { Briefcase } from './icons'

const EmptyList = ({ ...props }) => {
  return <Box
    justifyContent="center"
    alignItems="center"
    {...props}
  >
    <Briefcase width={100} height={100} color={theme.colors.placeholder} strokeWidth={0.5} />
    <Label fontSize={16} color="placeholder" mt={16}>İlan bulunamadı</Label>
  </Box>
}

export default EmptyList