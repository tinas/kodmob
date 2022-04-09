import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeView from "../views/HomeView"
import SearchView from '../views/SearchView'
import MentorsView from '../views/MentorsView'
import SubscribeView from '../views/SubscribeView'
import AboutView from '../views/AboutView';
import DetailView from '../views/DetailView';

import Logo from './Logo';
import Button from './Button';
import TabBar from './TabBar'
import { Info, ArrowLeft } from './icons'
import theme from '../helpers/theme';
import Label from './Label'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeView}
        options={({ navigation }) => screenOptions(navigation)['Home']}
      />
      <Tab.Screen
        name="Search"
        component={SearchView}
        options={({ navigation }) => screenOptions(navigation)['Search']}
      />
      <Tab.Screen
        name="Mentors"
        component={MentorsView}
        options={({ navigation }) => screenOptions(navigation)['Mentors']}
      />
      <Tab.Screen
        name="Subscribe"
        component={SubscribeView}
        options={({ navigation }) => screenOptions(navigation)['Subscribe']}
      />
    </Tab.Navigator>
  )
}

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='About'
        component={AboutView}
        options={({ navigation }) => screenOptions(navigation, 'Hakkımızda')['About']}
      />
      <Stack.Screen
        name='Detail'
        component={DetailView}
        options={({ navigation }) => screenOptions(navigation, 'İlan detayı')['Detail']}
      />
    </Stack.Navigator>
  )
}

const screenOptions = (navigation, title = '') => {
  return {
    'Home': {
      title: '',
      tabBarLabel: 'Home',
      headerShadowVisible: false,
      headerLeft: () => (<Logo ml={16} />),
      headerRight: () => (<Button mr={16}
        onPress={() => navigation.navigate('About')}
        hitSlop={{ left: 32, top: 8, right: 16 }}>
        <Info width={24} height={24} color={theme.colors.icon} />
      </Button>)
    },
    'About': {
      title: title,
      headerTitleAlign: 'center',
      tabBarLabel: 'About',
      headerShadowVisible: false,
      headerLeft: () => (<Button
        onPress={() => navigation.goBack()}
        hitSlop={{ left: 16, right: 32, top: 8, bottom: 8 }}>
        <ArrowLeft width={24} height={24} color={theme.colors.icon} />
      </Button>)
    },
    'Detail': {
      title: title,
      headerTitleAlign: 'center',
      tabBarLabel: 'Detail',
      headerShadowVisible: false,
      headerLeft: () => (<Button
        onPress={() => navigation.goBack()}
        hitSlop={{ left: 16, right: 32, top: 8, bottom: 8 }}>
        <ArrowLeft width={24} height={24} color={theme.colors.icon} />
      </Button>)
    },
    'Search': {
      title: '',
      tabBarLabel: 'Search',
      headerShadowVisible: false,
      headerLeft: () => (<Label
        ml={16}
        color="black"
        fontSize={28}
        fontWeight={700}
      >
        Ara
      </Label>
      )
    },
    'Mentors': {
      title: '',
      tabBarLabel: 'Mentors',
      headerShadowVisible: false,
      headerLeft: () => (<Label
        ml={16}
        color="black"
        fontSize={28}
        fontWeight={700}
      >
        Mentorlar
      </Label>
      )
    },
    'Subscribe': {
      title: '',
      tabBarLabel: 'Subscribe',
      headerShadowVisible: false,
      headerLeft: () => (<Label
        ml={16}
        color="black"
        fontSize={28}
        fontWeight={700}
      >
        Abone ol
      </Label>
      )
    },
  }
}

export default StackNavigator