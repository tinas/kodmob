import React from 'react'
import { Linking } from 'react-native'
import Label from '../components/Label'
import Box from '../components/Box'
import Button from '../components/Button'
import { Info } from '../components/icons'
import theme from '../helpers/theme'

const SubscribeView = () => {
  return (
    <Box flex={1} px={16} bg="white">
      <Label fontSize={16} color="icon">Güncel iş ilanlarını alın!</Label>
      <Box mt={40} flexDirection="row" alignItems="center">
        <Info width={24} height={24} color={theme.colors.icon} />
        <Label ml={8} fontSize={20} color="icon">Abone ol nedir?</Label>
      </Box>
      <Label mt={16} fontSize={16} color="placeholder">Güncel iş ilanlarından haberdar olmak için abone olabilirsiniz.</Label>
      <Label mt={12} fontSize={16} color="placeholder">Bildirimleri haftalık, ya da aylık olarak belirttiğiniz Email adresinize göndereceğiz.</Label>
      <Label mt={12} fontSize={16} color="placeholder">kodilan.com websitesi üzerinden aboneliğinizi başlatabilirsiniz.</Label>
      <Button
        mt={40}
        p={14}
        width="100%"
        backgroundColor="green"
        alignItems="center"
        borderRadius={6}
        onPress={() => {
          Linking.openURL('https://kodilan.com').catch((err) => {
            console.error('Failed opening page because: ', err)
            alert('Bir hata oluştu!')
          })
        }}
      >
        <Label color="white" fontSize={12}>Abone ol</Label>
      </Button>
    </Box>
  )
}

export default SubscribeView
