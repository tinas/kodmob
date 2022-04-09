import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Box from './Box'
import Label from './Label'
import CompanyLogo from './CompanyLogo'
import JobPositionBadge from './JobPositionBadge'
import JobTag from './JobTag'
import theme from '../helpers/theme'
import { formatDistanceToNowDate } from '../helpers/date'
import { Briefcase, MapPin } from './icons'
import Button from './Button'

const CardHeader = ({ item }) => {
  return <Box flexDirection="row" justifyContent="space-between">
    <Box flexDirection="row" alignItems="center">
      <CompanyLogo
        uri={item.company.logo}
        width={40}
        height={40}
      />
      <Box ml={10}>
        <Box flexDirection="row" alignItems="center">
          <Briefcase width={10} height={10} color={theme.colors.placeholder} />
          <Label fontSize={8} color="green" ml={4}>{item.company.name}</Label>
        </Box>
        <Box flexDirection="row" alignItems="center" mt={8}>
          <MapPin width={10} height={10} color={theme.colors.placeholder} numberOfLines={1} />
          <Label fontSize={8} color="green" ml={4} numberOfLines={1}>{item.location}</Label>
        </Box>
      </Box>
    </Box>
    <Box alignItems="flex-end" justifyContent="space-between">
      <JobPositionBadge type={item.type} />
      <Label fontSize={8} color="placeholder">{formatDistanceToNowDate(item.updated_at)}</Label>
    </Box>
  </Box>
}

const CardFooter = ({ tags }) => {
  return tags.length > 0 &&
    <Box flexDirection="row" flexWrap="wrap">
      {tags.map((t, index) => (
        <JobTag tag={t.name} mr={8} key={index} mt={8} />
      ))}
    </Box>
}

const JobCard = ({ item, ...props }) => {
  const navigation = useNavigation()

  return <Button
    padding={10}
    border={1}
    borderRadius={8}
    borderColor="border"
    mb={8}
    onPress={() => navigation.navigate('Detail', { item })}
    {...props}
  >
    <CardHeader item={item} />
    <Label mt={10} mb={2} color="black" fontSize={12}>{item.position}</Label>
    <CardFooter tags={item.tags} />
  </Button>
}

export default JobCard