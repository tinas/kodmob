import React from 'react'
import Box from './Box'
import Logo from './Logo'
import Button from './Button'
import { Info } from './icons'
import theme from '../helpers/theme'

const AppHeader = ({ ...props }) => {
  return <Box
    width="100%"
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    height={50}
    px={16}
    backgroundColor="white"
    {...props}
  >
    <Logo />
    <Button hitSlop={{ left: 32, top: 8, right: 16 }}>
      <Info width={24} height={24} color={theme.colors.icon} />
    </Button>
  </Box>
}

export default AppHeader