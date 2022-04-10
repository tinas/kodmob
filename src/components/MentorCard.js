import React from 'react'
import { Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Box from './Box'
import Label from './Label'
import Button from './Button'
import CompanyLogo from './CompanyLogo'
import JobTag from './JobTag'

const MentorCard = ({ item, ...props }) => {
  const { width } = Dimensions.get('window')
  const navigation = useNavigation()

  return (
    <Button
      padding={10}
      border={1}
      borderRadius={8}
      borderColor="border"
      mb={8}
      onPress={() => navigation.navigate('MentorDetail', { item })}
      {...props}
    >
      <Box flexDirection="row" justifyContent="space-between">
        <Box flexDirection="row" alignItems="center">
          <CompanyLogo
            uri={item.profile.avatarUrl}
            width={40}
            height={40}
          />
          <Box ml={6} width={width - 180}>
            <Label fontSize={12} color="green">{item.username}</Label>
            <Label mt={6} fontSize={12} color="placeholder" numberOfLines={1}>{item.profile.shortDescription}</Label>
          </Box>
        </Box>
        <JobTag tag="Randevu al" height={24} justifyContent="center" />
      </Box>
      <Label mt={14} fontSize={10} color="icon" numberOfLines={3}>{item.profile.longDescription}</Label>
    </Button>
  )
}

export default MentorCard