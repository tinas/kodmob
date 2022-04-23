import React from 'react'
import { Platform, NativeModules } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './store'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components'
import Navigation from './navigation'
import theme from './helpers/theme'

const App = () => {
  React.useEffect(() => {
    if (Platform.OS != 'android') return

    NativeModules.SplashScreenModule.hide();
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

export default App
