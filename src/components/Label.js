import { Text } from 'react-native'
import styled from 'styled-components'
import { compose, color, size, typography, space } from 'styled-system'

const Label = styled(Text)(compose(typography, space, color, size))

export default Label