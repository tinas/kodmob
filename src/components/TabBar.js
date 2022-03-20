import React from 'react'
import { Platform } from 'react-native'
import Button from './Button'
import Box from './Box'
import { Briefcase, Search, Users, Bell } from './icons'
import theme from '../helpers/theme'

function TabBar({ state, descriptors, navigation }) {
  return (
    <Box
      pb={Platform.OS == 'ios' && 20}
      bg="white"
      flexDirection="row"
      paddingHorizontal={16}
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 24
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return (
          <Button key={label} pt={6} flexDirection="column" height={56} flex={1} onPress={onPress}>
            {label === 'Home' && <Briefcase width={32} height={32} color={isFocused ? theme.colors.green : theme.colors.icon} />}
            {label === 'Search' && <Search width={32} height={32} color={isFocused ? theme.colors.green : theme.colors.icon} />}
            {label === 'Mentors' && <Users width={32} height={32} color={isFocused ? theme.colors.green : theme.colors.icon} />}
            {label === 'Subscribe' && <Bell width={32} height={32} color={isFocused ? theme.colors.green : theme.colors.icon} />}
            {/* indicator */}
            <Box size={4} bg={isFocused ? 'green' : 'white'} mt={6} borderRadius="full" />
          </Button>
        )
      })}
    </Box>
  )
}

export default TabBar