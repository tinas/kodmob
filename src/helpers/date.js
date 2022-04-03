import { distanceInWordsToNow, format } from 'date-fns'

const locale = require('date-fns/locale/tr')

export const formatDistanceToNowDate = (date) => {
  const formatted = distanceInWordsToNow(date, { locale, addSuffix: true })

  return formatted.replace('yaklaşık', '')
}

export const formatLocaleDate = (date) => {
  return format(date, 'd MMMM YYYY', { locale })
}