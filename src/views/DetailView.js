import React from 'react'
import { SafeAreaView, ScrollView, Linking, useWindowDimensions } from 'react-native'
import RenderHtml from 'react-native-render-html'
import Box from '../components/Box'
import Button from '../components/Button'
import CompanyLogo from '../components/CompanyLogo'
import Label from '../components/Label'
import JobPositionBadge from '../components/JobPositionBadge'
import JobTag from '../components/JobTag'
import { MapPin, Calendar, Globe, Twitter } from '../components/icons'
import theme from '../helpers/theme'
import { formatLocaleDate } from '../helpers/date'

const DetailView = ({ route }) => {
  const { width } = useWindowDimensions()
  const item = route.params.item
  const source = {
    html: `<div style="color:#333333; line-height:24px;">${item.description}</div>`
  }

  const Tags = () => {
    return (
      item.tags.length > 0 &&
      <Box flexDirection="row" flexWrap="wrap">
        {item.tags.map((t, index) => (
          <JobTag tag={t.name} mr={8} key={index} mt={8} />
        ))}
      </Box>
    )
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
          <CompanyLogo uri={item.company.logo} width={150} height={150} />
          <Label color="green" fontSize={24} fontWeight={600} mt={24} textAlign="center">{item.company.name}</Label>
          <Box flexDirection="row" mt={16} alignItems="center">
            <MapPin width={16} height={16} color={theme.colors.placeholder} />
            <Label color="placeholder" ml={6} fontSize={16}>{item.location}</Label>
          </Box>
          <Button
            mt={32}
            p={14}
            width="100%"
            backgroundColor={item.apply_email ? 'green' : 'placeholder'}
            alignItems="center"
            borderRadius={6}
            onPress={() => {
              Linking.openURL(`mailto:${item.apply_email}`).catch((err) => {
                console.error('Failed opening page because: ', err)
                alert('E-posta uygulaması bulunamadı!')
              })
            }}
            disabled={!item.apply_email}
          >
            <Label color="white" fontSize={12}>E-posta ile başvur</Label>
          </Button>
          <Button
            mt={8}
            p={12}
            width="100%"
            borderColor={item.apply_url ? 'green' : 'placeholder'}
            borderWidth={1}
            alignItems="center"
            borderRadius={6}
            onPress={() => {
              Linking.openURL(item.apply_url).catch((err) => {
                console.error('Failed opening page because: ', err)
                alert('Bir hata oluştu!')
              })
            }}
            disabled={!item.apply_url}
          >
            <Label color={item.apply_url ? 'green' : 'placeholder'} fontSize={12}>Site üzerinden başvur</Label>
          </Button>
        </Box>
        <JobPositionBadge type={item.type} mt={40} />
        <Label mt={8} color="black" fontSize={20} fontWeight={600}>{item.position}</Label>
        <Box mt={16}>
          <RenderHtml contentWidth={width} source={source} baseStyle={{}} />
        </Box>
        {item.tags.length > 0 && (<Label mt={32} fontSize={16} fontWeight={600} color="placeholder">Etiketler</Label>)}
        <Tags />
        <Box mt={32}>
          <Box flexDirection="row" alignItems="center">
            <Calendar width={12} height={12} color={theme.colors.placeholder} />
            <Label ml={6} fontSize={12} color="placeholder">Son güncelleme</Label>
          </Box>
          <Label mt={6} fontSize={10} color="green">{formatLocaleDate(item.updated_at)}</Label>
          {
            item.company.www && <Box>
              <Box flexDirection="row" alignItems="center" mt={12}>
                <Globe width={12} height={12} color={theme.colors.placeholder} />
                <Label ml={6} fontSize={12} color="placeholder">Website</Label>
              </Box>
              <Label mt={6} fontSize={10} color="green">{item.company.www}</Label>
            </Box>
          }
          {
            item.company.twitter && <Box>
              <Box flexDirection="row" alignItems="center" mt={12}>
                <Twitter width={12} height={12} color={theme.colors.placeholder} />
                <Label ml={6} fontSize={12} color="placeholder">Twitter</Label>
              </Box>
              <Label mt={6} fontSize={10} color="green">{item.company.twitter}</Label>
            </Box>
          }
        </Box>
      </Box>
    </Box>
  )
}

export default DetailView