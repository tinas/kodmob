import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeView from "./views/HomeView"
import SearchView from './views/SearchView'
import MentorsView from './views/MentorsView'
import SubscribeView from './views/SubscribeView'
import { NavigationContainer } from '@react-navigation/native'
import Logo from './components/Logo'
import Button from './components/Button'
import TabBar from './components/TabBar'

import { Bell, Info } from './components/icons'
import theme from './helpers/theme'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeView} options={({ navigation }) => {
        return {
          title: '',
          tabBarLabel: 'Home',
          headerStyle: {
            shadowColor: 'transparent'
          },
          headerLeft: () => (<Logo pl={16} />),
          headerRight: () => (<Button pr={16} hitSlop={{ left: 32, top: 8, right: 16 }}>
            <Info width={24} height={24} color={theme.colors.icon} />
          </Button>)
        }
      }} />
      <Tab.Screen name="Search" component={SearchView} />
      <Tab.Screen name="Mentors" component={MentorsView} />
      <Tab.Screen name="Subscribe" component={SubscribeView} />
    </Tab.Navigator>
  )
}

const Navigation = () => {
  return <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
}

export default Navigation
