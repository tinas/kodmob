import React from 'react'
import { FlatList } from 'react-native'
import { useScrollToTop } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { setMentors } from '../store/mentorSlice'
import Label from '../components/Label'
import Box from '../components/Box'
import Loader from '../components/Loader'
import MentorCard from '../components/MentorCard'
import { fetchMentors } from '../services/mentors-service'

const MentorsView = () => {
  const [isLoading, setLoading] = React.useState(true)

  const dispatch = useDispatch()
  const { mentors } = useSelector((state) => state.mentors)

  const ref = React.useRef(null)
  useScrollToTop(ref)

  React.useEffect(() => {
    load()
  }, [])

  const load = async () => {
    if (!mentors.length) {
      const response = await fetchMentors()
      const shuffle = response.data.sort(() => Math.random() - 0.5)
      dispatch(setMentors(shuffle))
    }

    setLoading(false)
  }

  const renderItem = ({ item }) => (
    <MentorCard item={item} />
  )

  const keyExtractor = (item) => item.username

  return (
    <Box flex={1} px={16} bg="white">
      {
        isLoading
          ? <Loader flex={1} />
          : <FlatList
            ref={ref}
            ListHeaderComponent={() => (
              <Label mb={40} fontSize={16} color="placeholder" style={{ lineHeight: 24 }}>
                Alanında uzman kişilerden yazılım geliştirme, kariyer tavsiyeleri, tasarım, SEO ve DevOps gibi birçok konuda birebir randevu alabilirsiniz.
              </Label>
            )}
            data={mentors}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
      }
    </Box>
  )
}

export default MentorsView
