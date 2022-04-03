import React from 'react'
import { Animated, Platform } from 'react-native'
import { useScrollToTop } from '@react-navigation/native'
import FeaturedCards from '../components/FeaturedCards'
import Box from '../components/Box'
import Label from '../components/Label'
import PeriodMenu from '../components/PeriodMenu'
import JobCard from '../components/JobCard'
import EmptyList from '../components/EmptyList'
import { useSelector } from 'react-redux'
import { fetchFeaturedPosts, fetchRecentPosts } from '../services/jobs-service'
import AppHeader from '../components/AppHeader'

const maxHeaderHeight = 325
const minHeaderHeight = 60
const diffHeaderHeight = maxHeaderHeight - minHeaderHeight

const HomeView = () => {
  const [featuredPosts, setFeaturedPosts] = React.useState([])
  const [recentPosts, setRecentPosts] = React.useState([])

  const { period } = useSelector((state) => state.period)

  const ref = React.useRef(null)
  useScrollToTop(ref)

  React.useEffect(() => {
    getFeaturedPosts()
    getRecentPosts()
  }, [])

  React.useEffect(() => {
    if (period.slug == 'all') return

    getRecentPosts()
  }, [period])

  const getFeaturedPosts = async () => {
    const fetaturedPostResponse = await fetchFeaturedPosts()
    setFeaturedPosts(fetaturedPostResponse.data.data)
  }

  const getRecentPosts = async () => {
    const postResponse = await fetchRecentPosts(period.slug)
    setRecentPosts(postResponse.data.data)
  }

  // Header Animation
  const animatedScrollY = React.useRef(new Animated.Value(0)).current

  const translateY = animatedScrollY.interpolate({
    inputRange: [0, diffHeaderHeight],
    outputRange: [0, -diffHeaderHeight],
    extrapolate: 'clamp'
  })

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: animatedScrollY } } }],
    { useNativeDriver: true }
  )

  return (
    <>
      {Platform.OS == "android" && <AppHeader style={{ position: "absolute", zIndex: 2 }} />}
      <Animated.View style={{
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 1,
        transform: [{ translateY }]
      }}>
        <Box pt={Platform.OS == 'android' && 40} px={16} bg="white">
          <Label fontSize={24} fontWeight="bold" color="black" mt={16}>İlanlara göz atın ✌️</Label>
          <Label fontSize={20} fontWeight="600" color="icon" mt={28}>Öne çıkan ilanlar</Label>
          <Box mt={8}>
            <FeaturedCards items={featuredPosts} />
          </Box>
          <Box flexDirection="row" justifyContent="space-between" alignItems="center">
            <Label fontSize={20} fontWeight="600" color="icon" mt={28}>Tüm ilanlar</Label>
            <Label fontSize={10} fontWeight="600" color="placeholder" mt={28}>Toplam {recentPosts.length} ilan bulundu</Label>
          </Box>
          <PeriodMenu my={16} />
        </Box>
      </Animated.View>

      <Animated.FlatList
        ref={ref}
        style={{ backgroundColor: "white" }}
        contentContainerStyle={{
          paddingTop: Platform.OS == 'ios'
            ? maxHeaderHeight
            : maxHeaderHeight + 50,
          paddingHorizontal: 8
        }}
        showsVerticalScrollIndicator={false}
        data={recentPosts}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => <JobCard item={item} />}
        ListEmptyComponent={() => <EmptyList flex={1} mt={70} />}
      />
    </>
  )
}

export default HomeView
