import React from 'react'
import FeaturedCards from '../components/FeaturedCards'
import Box from '../components/Box'
import Label from '../components/Label'
import PeriodMenu from '../components/PeriodMenu'
import { fetchFeaturedPosts } from '../services/jobs-service'
import { useSelector } from 'react-redux'
import { fetchFeaturedPosts, fetchRecentPosts } from '../services/jobs-service'

const HomeView = () => {
  const [featuredPosts, setFeaturedPosts] = React.useState([])
  const [recentPosts, setRecentPosts] = React.useState([])

  const { period } = useSelector((state) => state.period)

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
  return (
    <Box flex={1} px={16} bg="white">
      <Label fontSize={28} fontWeight="bold" color="black" mt={40}>İlanlara göz atın ✌️</Label>
      <Label fontSize={20} fontWeight="600" color="icon" mt={28}>Öne çıkan ilanlar</Label>
      <Box mt={8}>
        <FeaturedCards items={featuredPosts} />
      </Box>
    </Box>
  )
}

export default HomeView
