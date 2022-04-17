import { ActivityIndicator } from 'react-native'
import styled from 'styled-components'
import { compose, flexbox, space, color } from 'styled-system'

const Loader = styled(ActivityIndicator)(compose(flexbox, space, color))

Loader.defaultProps = {
  color: 'green'
}

export default Loader
