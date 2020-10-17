import React, { useState } from 'react'

import { StyleSheet, View, Dimensions, Text } from 'react-native'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import MapMarker from '../images/mapMarker.png'
import { RectButton } from 'react-native-gesture-handler'
import api from '../services/api'

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}


export default function OrphanagesMap () {
  const [orphanages, setOrphanages ] = useState<Orphanage[]>([])
  const navigation = useNavigation()

  useFocusEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data)
    })
 })

  function handleNavigateToOrphanageDetails (id: number) {
    navigation.navigate('OrphanageDetails', { id })
  }

  function handleNavigateToCreateOrphanage () {
    navigation.navigate('SelectMapPosition')
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -27.7020339,
          longitude: -48.6705213,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
      >
        {orphanages.map(orphanage => {
          return (
           <Marker
              key={orphanage.id}
              icon={MapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude
              }}
            >
              <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>  
            </Marker>
           )
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} Instituições encontradas</Text>
        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
          <Feather name='plus' size={20} color='#FFF' />
        </RectButton>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height

  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
    elevation: 3
  },

  calloutText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5',
    fontSize: 14
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 25,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 44,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3
  },
  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3'
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
