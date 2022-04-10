import React from 'react'
import { SafeAreaView, ScrollView, Linking, useWindowDimensions } from 'react-native'
import RenderHtml from 'react-native-render-html'
import Box from '../components/Box'
import Button from '../components/Button'
import CompanyLogo from '../components/CompanyLogo'
import Label from '../components/Label'
import { MapPin } from '../components/icons'
import theme from '../helpers/theme'

const MentorDetailView = ({ route }) => {
  const { width } = useWindowDimensions()
  const item = route.params.item
  const source = {
    html: `<div style="color:#333333; line-height:24px;">${item.profile.longDescription}</div>`
  }

  return (
    <Box as={SafeAreaView} flex={1} backgroundColor={theme.colors.white}>
      <Box
        as={ScrollView}
        flex={1}
        showsVerticalScrollIndicator={false}
        backgroundColor="white"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      >
        <Box alignItems="center" mt={32}>
          <CompanyLogo uri={item.profile.avatarUrl} width={150} height={150} />
          <Label color="green" fontSize={24} fontWeight={600} mt={24} textAlign="center">{`${item.profile.firstName} ${item.profile.lastName}`}</Label>
          <Label color="placeholder" mt={8} ml={6} fontSize={16}>{item.profile.shortDescription}</Label>
          <Button
            mt={32}
            p={14}
            width="100%"
            backgroundColor={item.username ? 'green' : 'placeholder'}
            alignItems="center"
            borderRadius={6}
            onPress={() => {
              Linking.openURL(`https://superpeer.com/kodilan/${item.username}?via=r.kodilan`).catch((err) => {
                console.error('Failed opening page because: ', err)
                alert('E-posta uygulaması bulunamadı!')
              })
            }}
            disabled={!item.username}
          >
            <Label color="white" fontSize={12}>Randevu al</Label>
          </Button>
        </Box>
        <Label mt={40} color="black" fontSize={20} fontWeight={600}>Detay</Label>
        <Box mt={16}>
          <RenderHtml contentWidth={width} source={source} baseStyle={{}} />
        </Box>
        <Box mt={32}>
          {
            item.profile.location && <Box>
              <Box flexDirection="row" alignItems="center" mt={12}>
                <MapPin width={12} height={12} color={theme.colors.placeholder} />
                <Label ml={6} fontSize={12} color="placeholder">Lokasyon</Label>
              </Box>
              <Label mt={6} fontSize={10} color="green">{item.profile.location}</Label>
            </Box>
          }
        </Box>
      </Box>
    </Box>
  )
}

export default MentorDetailView