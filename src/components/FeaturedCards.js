import React from 'react'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Label from './Label'
import Box from './Box'
import CompanyLogo from './CompanyLogo'
import Button from './Button'

const FeaturedCard = ({ item, navigation }) => {
  return <Button
    marginRight={8}
    width={100}
    height={100}
    border={1}
    borderColor="border"
    borderRadius={6}
    padding={4}
    onPress={() => navigation.navigate('Detail', { item })}
  >
    <Box borderBottomColor="border" borderBottomWidth={1} padding={6} alignItems="center">
      <CompanyLogo
        uri={item.company.logo}
        width={30}
        height={30}
      />
      <Label mt={6} fontSize={8} textAlign="center" color="green" numberOfLines={1}>{item.company.name}</Label>
    </Box>
    <Label mt={2} fontSize={8} color="black" numberOfLines={2}>{item.position}</Label>
  </Button>
}

const FeaturedCards = ({ items }) => {
  const navigation = useNavigation()

  return <FlatList
    data={items}
    horizontal
    renderItem={({ item }) => <FeaturedCard item={item} navigation={navigation} />}
    keyExtractor={(item) => item.slug}
    showsHorizontalScrollIndicator={false}
    snapToInterval={108}
    decelerationRate="fast"
  />
}

export default FeaturedCards