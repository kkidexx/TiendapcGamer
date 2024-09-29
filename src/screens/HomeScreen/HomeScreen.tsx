import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { auth, dbRealTime } from '../../config/firebaseConfig'; // Asegúrate de tener configurado firebaseConfig correctamente
import { signOut, updateProfile } from 'firebase/auth'; // Corregir importación
import { FlatList } from 'react-native-gesture-handler';
import { ProductCardComponent } from './components/ProductCardComponent';
import { NewProductComponent } from './components/NewProductComponent';
import { onValue, ref } from 'firebase/database'; // Importar correctamente la base de datos en tiempo real
import { CommonActions, useNavigation } from '@react-navigation/native';

// Interface para formUser
interface FormUser {
  name: string;
}

// Interface Product
export interface Product {
  id: string;
  code: string;
  nameProduct: string;
  price: number;
  stock: number;
  description: string;
}

export const HomeScreen = () => {
  const navigation = useNavigation();

  // Hook useState para cambiar el estado del formulario
  const [formUser, setFormUser] = useState<FormUser>({
    name: ''
  });

  // Hook useState para capturar y modificar la data del usuario autenticado
  const [userData, setUserData] = useState(auth.currentUser); // Corregido

  // Hook useState para gestionar la lista de productos
  const [products, setProducts] = useState<Product[]>([]);

  // Hook useState para controlar la visibilidad del modal
  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);

  // Hook useState para permitir que el modal de producto se visualice o no
  const [showModaProduct, setShowModaProduct] = useState<boolean>(false);

  // Hook useEffect para validar el estado de autenticación
  useEffect(() => {
    setUserData(auth.currentUser); // Obtener información del usuario autenticado
    setFormUser({ name: auth.currentUser?.displayName ?? '' });
    getAllProducts();
  }, []);

  // Función para actualizar el estado del formulario
  const handleSetValues = (key: string, value: string) => {
    setFormUser({ ...formUser, [key]: value });
  };

  // Función para actualizar la información del usuario autenticado
  const handleUpdateUser = async () => {
    try {
      if (userData) {
        await updateProfile(userData, { displayName: formUser.name });
      }
    } catch (e) {
      console.log(e);
    }
    setShowModalProfile(false); // Ocultar modal
  };

  // Función para obtener los productos y listarlos
  const getAllProducts = () => {
    const dbRef = ref(dbRealTime, 'products/' + auth.currentUser?.uid);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      //VERIFICAR QUE EXISTE DATA
      if(!data) return;
      const getKeys = data ? Object.keys(data) : [];
      const listProduct: Product[] = getKeys.map((key) => ({
        ...data[key],
        id: key,
      }));
      setProducts(listProduct); // Actualizar la data obtenida
    });
  };

  // Función para cerrar sesión
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Login' }] }));
      setShowModalProfile(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <View style={styles.rootHome}>
        <View style={styles.Header}>
          <Avatar.Text size={50} label="AG" />
          <View>
            <Text variant='bodySmall'>BIENVENIDO</Text>
            <Text variant='labelLarge'>{userData?.displayName}</Text>
          </View>
          <View style={styles.icon}>
            <IconButton
              icon="account-edit"
              size={30}
              mode='contained'
              onPress={() => setShowModalProfile(true)} // Abre el modal al hacer clic
            />
          </View>
        </View>
        <View>
          <FlatList
            data={products}
            renderItem={({ item }) => <ProductCardComponent product={item} />} // Corregido
            keyExtractor={item => item.id}
          />
        </View>
      </View>

      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
          <View style={styles.Header}>
            <Text variant='headlineSmall'>Mi perfil</Text>
            <View style={styles.icon}>
              <IconButton
                icon="close-outline"
                size={40}
                onPress={() => setShowModalProfile(false)}
              />
            </View>
          </View>
          <Divider />
          <TextInput
            mode='outlined'
            label='Nombre'
            value={formUser.name}
            onChangeText={(value) => handleSetValues('name', value)}
          />
          <TextInput
            mode='outlined'
            label='Correo'
            disabled
            value={userData?.email || ''} // Corregido
          />
          <Button mode='contained' onPress={handleUpdateUser}>Actualizar</Button>
          <View style={styles.iconSignOut}>
            <IconButton
              icon='logout'
              size={35}
              mode='contained'
              onPress={handleSignOut}
            />
          </View>
        </Modal>
      </Portal>
      <FAB
        icon="plus"
        style={styles.fabProduct}
        onPress={() => setShowModaProduct(true)}
      />
      <NewProductComponent showModaProduct={showModaProduct} setshowModaProduct={setShowModaProduct} />
    </>
  );
};
