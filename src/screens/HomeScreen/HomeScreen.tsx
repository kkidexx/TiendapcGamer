import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { auth } from '../../config/firebaseConfig';
import firebase, { updateProfile } from '@firebase/auth';
import { FlatList } from 'react-native-gesture-handler';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { ProductCardComponent } from './components/ProductCardComponent';
import { NewProductComponent } from './components/NewProductComponent';

// Interface para formUser
interface FormUser {
  name: string;
}
//interface -Product
interface Product{
  id:string;
  code: string;
  nameProduct: string;
  price: number;
  stock: number;
  descripcion: string;
  
}

export const HomeScreen = () => {

  // Hook useState: cambiar el estado del formulario
  const [formUser, setFormUser] = useState<FormUser>({
    name: ""
  });

  //hook usestate: capturar y modificar la data del usuario autetnicado
  const [userData, setUserData] = useState<firebase.User | null>(null)


  //hook usestate: gestionar la lista de productos
  const [products, setproducts] = useState<Product[]>([
    {
      id:'1',
       code:'23d43f', 
       nameProduct:'Teclado',
        price: 70, 
        stock:10,
         descripcion: 'Teclado Gamer 70% gaming'
        },
        {
          id:'2',
           code:'54gdg4', 
           nameProduct:'Mause',
            price: 40, 
            stock:10,
             descripcion: 'Logitech G305 LigthStick'
            },
    



  ]);

  // Hook useState: controlar la visibilidad del modal
  const [showModalProfile, setShowModalProfile] = useState<boolean>(false); // Cambié a false por defecto, ya que típicamente el modal no está visible al iniciar


  //hook usestate: permirir que el modal de suario se viulize o no
  const [showModaProduct, setshowModaProduct] = useState<boolean>(false)




  // Hook useEffect: validar el estado de autenticación
  useEffect(() => {
    setUserData(auth.currentUser); // obtiene informacion usuario autenticado
    setFormUser({name: auth.currentUser?.displayName ?? ''})
   
  }, []);

  //funcion: actuañlizar el estado del formulario
  const handleSetValues=(key: string, value: string)=>{
    setFormUser({...formUser, [key]: value})

  }

  //funcion: actualizar la imformacion del usuario autentificado
  const handleUpdateUser= async() => {
    try {
    await updateProfile(userData!,
      {displayName: formUser.name});
      
    }catch(e){
      console.log(e);
      
    }
    //ocultar modal
    setShowModalProfile(false);
  }


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
          renderItem={({item})=> <ProductCardComponent />}
          keyExtractor={item => item.id}
          />
      </View>
      </View>

      <Portal>
        <Modal visible={showModalProfile}  contentContainerStyle={styles.modal}>
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
            onChangeText={(value)=>handleSetValues('name', value)}
          />
          <TextInput
            mode='outlined' 
            label='Correo'
            disabled
            value={userData?.email!}
          />
          <Button mode='contained' onPress={handleUpdateUser}>Actualizar</Button> 
        </Modal>
      </Portal>
      <FAB
      icon="plus"
      style={styles.fabProduct}
      onPress={() => setshowModaProduct(true)}
    />
    <NewProductComponent showModaProduct={showModaProduct} setshowModaProduct={setshowModaProduct}/>
    </>
  );
}
