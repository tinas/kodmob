import React from 'react'
import { Platform, NativeModules } from 'react-native'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import CodePush from 'react-native-code-push'
import { store } from './store'
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

const codepushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START
}

export default CodePush(codepushOptions)(App)
