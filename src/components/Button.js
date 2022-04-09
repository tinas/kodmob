import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { compose, position, flexbox, space, color, size, layout, border, borderRadius } from 'styled-system'

const Button = styled(TouchableOpacity)(compose(position, flexbox, space, color, size, layout, border, borderRadius))

export default Button