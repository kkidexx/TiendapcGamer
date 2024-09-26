import React, { useState } from 'react'
import { View } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { styles } from '../theme/styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';

//interface- formregister
interface FormRegister{
    email: string,
    password: string,
}


//interface - Message
interface ShowMessage{
    visible: boolean,
    message: string,
    color: string
}



export const RegisterScreens = () => {
    //hook useState: cambiar el estado del formulario
    const [formRegister, setformRegister] = useState<FormRegister>({
        email:"",
        password:""

    });

    //hook useState: cambiar estado del mensaje
    const [showMessage, setShowMessage] = useState<ShowMessage>({
        visible:false,
        message:"",
        color:"#fff"


    });


    //hook useState: permitir que la contraseña se visible o no
    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);


       //hook useNavigation: permite navegacion de un screen a otro
       const navigation = useNavigation();

    //funcion: Actualizar el estado del formulario
    const handleSetValues=(key: string, value: String)=> {
        setformRegister({...formRegister, [key]: value });

    }

    //funcion: registrar nuevos usuarios
    const handleRegister = async() => {
        if(!formRegister.email || !formRegister.password){
            setShowMessage({
                visible:true, 
                message:'Completa todos los campos!',
                color: '#8a2a1e'
                
            });
            return;
        }
        console.log(formRegister);
        try {
        const response = await createUserWithEmailAndPassword(
            auth,
            formRegister.email,
            formRegister.password 
        );
        setShowMessage({
            visible:true,
            message: 'Registro exitoso!',
            color: '#52ff11'



        });


        }catch(e){
            console.log(e);
            setShowMessage({
                visible:true,
                message: 'No se logro completar la transaccion, intente mas tarde',
                color: '#8a2a1e'
    
    
    
            });
    

        }

        
    }



  return (
    <View style={styles.root}>
    <Text style={styles.text}>Registrate</Text>
    <TextInput
      label="Email"
      mode='outlined'
      placeholder='Escribe tu correo'
      onChangeText={(value)=>handleSetValues('email',value)}
    />
    <TextInput
      label="Contraseña"
      mode='outlined'
      placeholder='Escribe tu contraseña'
      secureTextEntry={hiddenPassword}
      onChangeText={(value)=>handleSetValues('password',value)}
      right={<TextInput.Icon icon="eye" onPress={()=>setHiddenPassword(!hiddenPassword)}/>}

    />
     <Button  mode="contained" onPress={handleRegister}>
    Registrar
  </Button>
  <Text style={styles.textRedirect}
  onPress={()=> navigation.dispatch(CommonActions.navigate({name: 'Login'}))}>
  Ya tienes una cuenta? Inicia session ahora
  </Text>
  <Snackbar
        visible={showMessage.visible}
        onDismiss={()=>setShowMessage({...showMessage,visible:false})}
        style={{...styles.message,
            backgroundColor: showMessage.color

        }}>

            {showMessage.message}
        
          </Snackbar>
    </View>
    
  )
}

