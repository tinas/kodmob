import axios from 'axios'

export const fetchMentors = async () => {
  const request = axios.get('https://raw.githubusercontent.com/kodilan-com/frontend/master/src/assets/data/mentors.json')

  return request
}
