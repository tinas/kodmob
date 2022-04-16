import { TAGS } from './constants'

export const getRandomTags = (count) => {
  const randomArray = []

  while (randomArray.length < count) {
    const randomItem = TAGS[Math.floor(Math.random() * TAGS.length)]

    if (!randomArray.includes(randomItem)) {
      randomArray.push(randomItem)
    }
  }

  return randomArray
}