import React from 'react';
import { View, ImageBackground } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { Product } from '../HomeScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';

//interface -props
interface Props {
  product: Product;
}

export const ProductCardComponent = ({ product }: Props) => {

  //hook usenavigation: navegar de un screen a otro
  const navigation = useNavigation();

  return (
    // Imagen de fondo con opacidad
    <ImageBackground 
      source={{uri: 'https://png.pngtree.com/background/20210714/original/pngtree-gamer-style-cmando-neon-effect-vactor-picture-image_1234598.jpg'}} // Coloca aquí la URL o usa require() para imágenes locales
      style={styles.backgroundImage}
      imageStyle={{opacity: 0.5}} // Controla la transparencia de la imagen
    >
      <View>
        <View style={styles.rootListProduct}>
          <Text variant='labelLarge'>Nombre: {product.nameProduct}</Text>
          <Text variant='bodyMedium'>Precio: ${product.price}</Text>
        </View>
        <View style={styles.icon}>
          <IconButton
            icon="details"
            size={25}
            mode='contained'
            onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Detalle', params: { product } }))}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
