import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

//interface . formUser
interface UserAuth{
  name: string;

}

export const HomeScreen = () => {

  //hook useStAate: cambiar el estado del formulario
  const [userAuth, setUserAuth] = useState<UserAuth>({
    name: ""
  });

  //hook useeefect: validar el estado de autetnficacion
  useEffect(() =>{
    onAuthStateChanged(auth, (user)=>{
      if(user){ //existe autentificacion
        setUserAuth ({name: user.displayName ?? 'NA'})

      }


    })


  },[])


  return (
    <View style={styles.rootHome}>
      <View style={styles.HeaderHome}>
      <Avatar.Text size={50} label="AG" />
      <View>
   <Text variant='bodySmall'>BIENVENIDO</Text>
   <Text variant='labelLarge'> {userAuth.name}</Text>
   </View>
   </View>
   </View>
  )
}
