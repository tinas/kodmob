import { View } from 'react-native'
import styled from 'styled-components'
import { compose, flexbox, space, color, size, borderRadius, border } from 'styled-system'

const Box = styled(View)(compose(flexbox, space, color, size, borderRadius, border))

export default Box
