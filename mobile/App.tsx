import React from 'react'

import { useFonts } from 'expo-font'
import { Nunito_600SemiBold_Italic, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito'
import Routes from './src/routes'

export default function App () {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold_Italic,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_600SemiBold
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <Routes />
  )
}
