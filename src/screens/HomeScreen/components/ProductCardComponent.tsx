
import React from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/styles'


export const ProductCardComponent = () => {
  return (
    <View>
        <View style={styles.rootListProduct}>
        <Text variant='labelLarge'>Nombre: Teclado 20</Text>
        <Text variant='bodyMedium'>Precio: Mause $20</Text>
        </View>
        <View style={styles.icon}>
        <IconButton
        
        icon="archive-outline"
        size={25}
        mode='contained'
        onPress={() => console.log('Pressed')}
        />
        </View>
    </View>
 )
}
