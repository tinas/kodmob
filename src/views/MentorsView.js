import React from 'react'
import { FlatList } from 'react-native'
import { useScrollToTop } from '@react-navigation/native'
import Label from '../components/Label'
import Box from '../components/Box'
import MentorCard from '../components/MentorCard'
import { fetchMentors } from '../services/mentors-service'

const MentorsView = () => {
  const [mentors, setMentors] = React.useState([])

  const ref = React.useRef(null)
  useScrollToTop(ref)

  React.useEffect(() => {
    (async () => {
      const response = await fetchMentors()
      const shuffle = response.data.sort(() => Math.random() - 0.5)
      setMentors(shuffle)
    })()
  }, [])


  return (
    <Box flex={1} px={16} bg="white">
      <FlatList
        ref={ref}
        ListHeaderComponent={() => (
          <Label mb={40} fontSize={16} color="placeholder" style={{ lineHeight: 24 }}>
            Alanında uzman kişilerden yazılım geliştirme, kariyer tavsiyeleri, tasarım, SEO ve DevOps gibi birçok konuda birebir randevu alabilirsiniz.
          </Label>
        )}
        data={mentors}
        renderItem={({ item }) => <MentorCard item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  )
}

export default MentorsView
