import React from 'react'
import { Animated, Platform } from 'react-native'
import { useScrollToTop, useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { setPeriod } from '../store/periodSlice'
import { fetchFeaturedPosts, fetchRecentPosts, fetchAllPosts } from '../services/jobs-service'
import FeaturedCards from '../components/FeaturedCards'
import Box from '../components/Box'
import Button from '../components/Button'
import Label from '../components/Label'
import PeriodMenu from '../components/PeriodMenu'
import JobCard from '../components/JobCard'
import EmptyList from '../components/EmptyList'
import Logo from '../components/Logo'
import Loader from '../components/Loader'
import Refresh from '../components/Refresh'
import { Info } from '../components/icons'
import theme from '../helpers/theme'
import { formatDateOfData } from '../helpers/date'
import { PERIODS } from '../helpers/constants'

const maxHeaderHeight = 325
const minHeaderHeight = Platform.OS == 'ios' ? 60 : 43
const diffHeaderHeight = maxHeaderHeight - minHeaderHeight

const HomeView = () => {
  const [isLoading, setLoading] = React.useState(true)
  const [refreshing, setRefreshing] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [lastPage, setLastPage] = React.useState()
  const [loadMore, setLoadMore] = React.useState(false)

  const dispatch = useDispatch()
  const { periodMenu } = useSelector((state) => state.periodMenu)
  const periods = useSelector((state) => state.periods)

  const navigation = useNavigation()
  const ref = React.useRef(null)
  useScrollToTop(ref)

  React.useEffect(() => {
    load()
  }, [])

  React.useEffect(() => {
    watchPeriodMenu()
  }, [periodMenu])

  const onRefresh = async () => {
    setRefreshing(true)

    const jobs = await getJobs(periodMenu.slug)
    setJobs(periodMenu.slug, jobs)

    setRefreshing(false)
  }

  const load = async () => {
    await getFeaturedJobs()

    const jobs = await getJobs(periodMenu.slug)
    setJobs(periodMenu.slug, jobs)
  }

  const watchPeriodMenu = async () => {
    if (periods[periodMenu.slug].length) return

    const jobs = await getJobs(periodMenu.slug)
    setJobs(periodMenu.slug, jobs)
  }

  const getFeaturedJobs = async () => {
    if (periods[PERIODS.featured.slug].length) return

    const fetaturedPostResponse = await fetchFeaturedPosts()
    const prepareData = formatDateOfData(fetaturedPostResponse.data.data)

    setJobs(PERIODS.featured.slug, prepareData)
  }

  const getJobs = async (period) => {
    setLoading(true)

    const response = period == PERIODS.all.slug
      ? await fetchAllPosts()
      : await fetchRecentPosts(period)

    if (period == PERIODS.all.slug) setLastPage(response.data.last_page)

    const prepareData = formatDateOfData(response.data.data)

    setLoading(false)

    return prepareData
  }

  const setJobs = (period, jobs) => {
    dispatch(setPeriod({ period, jobs }))
  }

  const onEndReached = async () => {
    if (periodMenu.slug != PERIODS.all.slug) return
    if (currentPage == lastPage) return

    setLoadMore(true)

    const nextPage = currentPage + 1

    const jobs = await fetchAllPosts(nextPage)
    const currentJobs = periods[PERIODS.all.slug]
    setJobs(PERIODS.all.slug, currentJobs.concat(jobs.data.data))

    setCurrentPage(nextPage)

    setLoadMore(false)
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

  const renderItem = ({ item }) => (
    <JobCard key={item.slug} item={item} />
  )

  const keyExtractor = (item) => item.slug

  return (
    <>
      {
        Platform.OS == 'android' && <Box
          position="absolute"
          zIndex={2}
          width="100%"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          height={50}
          px={16}
          backgroundColor="white"
        >
          <Logo />
          <Button
            hitSlop={{ left: 32, top: 8, right: 16 }}
            onPress={() => navigation.navigate('About')}
          >
            <Info width={24} height={24} color={theme.colors.icon} />
          </Button>
        </Box>
      }

      <Animated.View style={{
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 1,
        transform: [{ translateY }]
      }}>
        <Box pt={Platform.OS == 'android' && 50} px={16} bg="white">
          <Label fontSize={24} fontWeight="bold" color="black" mt={16}>İlanlara göz atın ✌️</Label>
          <Label fontSize={20} fontWeight="600" color="icon" mt={28}>Öne çıkan ilanlar</Label>
          <Box mt={8}>
            <FeaturedCards items={periods[PERIODS.featured.slug]} />
          </Box>
          <Box flexDirection="row" justifyContent="space-between" alignItems="center">
            <Label fontSize={20} fontWeight="600" color="icon" mt={28}>Tüm ilanlar</Label>
            <Label fontSize={10} fontWeight="600" color="placeholder" mt={28}>Toplam {periods[periodMenu.slug].length} ilan bulundu</Label>
          </Box>
          <PeriodMenu my={16} />
        </Box>
      </Animated.View>

      <Animated.FlatList
        ref={ref}
        style={{ backgroundColor: "white" }}
        contentContainerStyle={[
          {
            paddingTop: Platform.OS == 'ios'
              ? maxHeaderHeight
              : maxHeaderHeight + 60,
            paddingHorizontal: 8
          },
          (isLoading || !periods[periodMenu.slug].length) &&
          {
            flex: 1,
            justifyContent: 'center'
          }]}
        showsVerticalScrollIndicator={false}
        data={periods[periodMenu.slug]}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        removeClippedSubviews={true}
        refreshControl={<Refresh
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressViewOffset={Platform.OS == 'ios' ? maxHeaderHeight : maxHeaderHeight + 50}
        />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={() => isLoading ? <Loader /> : <EmptyList />}
        ListFooterComponent={() => loadMore && (
          <Box my={32} justifyContent="center" alignItems="center">
            <Loader />
          </Box>
        )}
      />
    </>
  )
}

export default HomeView
