import React from 'react'
import { ScrollView } from 'react-native'
import Box from '../components/Box'
import Logo from '../components/Logo'

const DetailView = () => {
  return <Box as={ScrollView}>
    <Logo />
  </Box>
}

export default DetailView