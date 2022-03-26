import React from 'react'
import FeaturedCards from '../components/FeaturedCards'
import Box from '../components/Box'
import Label from '../components/Label'
import { fetchFeaturedPosts } from '../services/jobs-service'

const HomeView = () => {
  const [featuredPosts, setFeaturedPosts] = React.useState([])

  React.useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const fetaturedPostResponse = await fetchFeaturedPosts()

    setFeaturedPosts(fetaturedPostResponse.data.data)
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
