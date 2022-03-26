import axios from 'axios'

axios.defaults.baseURL = 'https://api.kodilan.com'

export const fetchFeaturedPosts = async () => {
  const request = axios.get('/posts?get=15&is_featured=1')

  return request
}