import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeView from "./views/HomeView"
import SearchView from './views/SearchView'

const Tab = createBottomTabNavigator()

const Navigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeView} />
      <Tab.Screen name="Settings" component={SearchView} />
    </Tab.Navigator>
  )
}

export default Navigation
