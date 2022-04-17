import React from 'react'
import { FlatList } from 'react-native'
import { useScrollToTop, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { setPeriod } from '../store/periodSlice'
import Box from '../components/Box'
import Button from '../components/Button'
import Label from '../components/Label'
import JobCard from '../components/JobCard'
import JobTag from '../components/JobTag'
import Loader from '../components/Loader'
import { Search } from '../components/icons'
import theme from '../helpers/theme'
import { fetchFeaturedPosts } from '../services/jobs-service'
import { getRandomTags } from '../helpers/tags'
import { PERIODS } from '../helpers/constants'

const SearchButton = ({ navigation }) => {
  return (
    <Button
      flexDirection="row"
      alignItems="center"
      backgroundColor="searchBox"
      height={52}
      borderRadius={6}
      pl={10}
      mb={10}
      onPress={() => navigation.navigate('SearchResults', { tag: null })}
    >
      <Search width={32} height={32} color={theme.colors.placeholder} strokeWidth={1.6} />
      <Label ml={16} fontSize={14} color="placeholder" fontWeight={600}>Pozisyon adı, teknoloji adı</Label>
    </Button>
  )
}

const Tags = ({ tags, navigation }) => {
  return (
    tags.length > 0 &&
    <Box flexDirection="row" flexWrap="wrap" mb={32}>
      {tags.map((tag, index) => (
        <Button
          key={index}
          onPress={() => navigation.navigate('SearchResults', { tag })}
        >
          <JobTag tag={tag} mr={12} mt={12} px={10} py={8} borderRadius={3} />
        </Button>
      ))}
    </Box>
  )
}

const SearchView = () => {
  const [tags, setTags] = React.useState([])
  const [isLoading, setLoading] = React.useState(true)

  const periods = useSelector((state) => state.periods)
  const featuredPosts = periods[PERIODS.featured.slug]

  const ref = React.useRef(null)
  useScrollToTop(ref)

  const navigation = useNavigation()

  React.useEffect(() => {
    load()
  }, [])

  const load = async () => {
    setTags(getRandomTags(10))

    if (!featuredPosts.length) {
      const response = await fetchFeaturedPosts()
      const shuffle = response.data.data.sort(() => Math.random() - 0.5)
      dispatch(setPeriod({ period: PERIODS.featured.slug, jobs: shuffle }))
    }

    setLoading(false)
  }

  return (
    <Box flex={1} px={16} bg="white">
      <SearchButton navigation={navigation} />
      {
        isLoading
          ? <Loader flex={1} />
          : <FlatList
            ref={ref}
            data={featuredPosts}
            ListHeaderComponent={() => (
              <Box>
                <Tags tags={tags} navigation={navigation} />
                <Label fontSize={20} fontWeight="600" color="icon" mb={16}>Öne çıkan ilanlar</Label>
              </Box>
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.slug}
            renderItem={({ item }) => <JobCard item={item} />}
          />
      }
    </Box>
  )
}

export default SearchView
