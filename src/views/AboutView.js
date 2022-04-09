import React from 'react'
import { ScrollView, useWindowDimensions, Linking } from 'react-native'
import RenderHtml from 'react-native-render-html'
import Box from '../components/Box'
import Label from '../components/Label'
import Button from '../components/Button'
import Logo from '../components/Logo'
import { Github, Twitter } from '../components/icons'
import theme from '../helpers/theme'

const Tag = ({ title, icon, ...props }) => {
  return (
    <Button flexDirection="row" {...props}>
      {icon}
      <Label ml={6} color="green" fontSize={12}>{title}</Label>
    </Button>
  )
}

const AboutView = () => {
  const { width } = useWindowDimensions()

  const source = {
    html: `
    <div style="color:#999999; line-height:24px;">
    <p>Kodilan.com ilan yayınlama sitesidir. Başvurular ilgili firmaya direkt olarak yapılmakta olup Kodilan.com
    üzerinden hiçbir veri gönderilmemektedir. Sitemizde yayınlanan ilanlar tamamen ücretsizdir ve ilan sahipleri
    ile sitemizin hiçbir ilişkisi yoktur. Paylaşılan ilanlarda değişiklik yapma ve yayından kaldırma hakları
    Kodilan'a aittir.</p>
    
    <p>Görüş ve önerileriniz için <strong style="color:#26AE61">info@kodilan.com</strong> adresine e-posta gönderebilirsiniz.</p>
    </div>`
  }

  return <Box
    as={ScrollView}
    backgroundColor="white"
    contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
  >
    <Box alignItems="center" mt={40}>
      <Logo fontSize={50} />
    </Box>
    <Box mt={40}>
      <RenderHtml contentWidth={width} source={source} />
    </Box>
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
      <Label color="white" fontSize={12}>Siteye Git</Label>
    </Button>
    <Box mt={40}>
      <Tag
        title="kodilancom"
        icon={<Twitter width={16} height={16} color={theme.colors.placeholder} />}
        onPress={() => {
          Linking.openURL('https://twitter.com/kodilancom').catch((err) => {
            console.error('Failed opening page because: ', err)
            alert('Bir hata oluştu!')
          })
        }}
      />
      <Tag
        mt={14}
        title="kodilan-com/frontend"
        icon={<Github width={16} height={16} color={theme.colors.placeholder} />}
        onPress={() => {
          Linking.openURL('https://github.com/kodilan-com').catch((err) => {
            console.error('Failed opening page because: ', err)
            alert('Bir hata oluştu!')
          })
        }}
      />
    </Box>
    <Label textAlign="center" mt={100} fontSize={12} color="icon">© Copyright 2021 kodilan.com Tüm hakları saklıdır.</Label>
  </Box>
}

export default AboutView