import axios from 'axios'

export const getSvgLogo = (uri) => {
  return axios.get(uri)
}