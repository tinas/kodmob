import axios from 'axios'
import { PER_PAGE } from '../helpers/constants'

axios.defaults.baseURL = 'https://api.kodilan.com'

export const fetchFeaturedPosts = async () => {
  const request = axios.get('/posts?get=15&is_featured=1')

  return request
}

export const fetchRecentPosts = async (period, page = 1) => {
  const request = axios.get(`/posts?get=${PER_PAGE}&period=${period}&page=${page}`)

  return request
}

export const search = async (query) => {
  const request = axios.get(`/search?query=${query}`)

  return request
}