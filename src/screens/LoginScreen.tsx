import React, { useState } from 'react'
import { View } from 'react-native'
import { styles } from '../theme/styles'
import { Button, Snackbar, TextInput, Text } from 'react-native-paper'
import { signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';

//interfacer -  FormLogin
interface FormLogin{
    email: string;
    password: string;
}


//interface - Message
interface ShowMessage{
    visible: boolean,
    message: string,
    color: string
}


export const LoginScreen = () => {


    //hook useState: cambiar estado del formulario

    const [FormLogin, setFormLogin] = useState<FormLogin>({
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

    //hook: actualñizar el estado del formulario
    const handleSetValues =(key: string, value: string) => {
        setFormLogin({...FormLogin, [key]: value});
    }

    //funcion: inciar session con el usuario registrado 
    const handleSignIn= async()=> {
//validando que los cmpos se encuentren llenos
        if(!FormLogin.email || !FormLogin.password){
            setShowMessage({
                visible:true,
                message:'Completa los campos',
                color: '#7a0808'
            })
            return;

        }
        //console.log(FormLogin);
        try{

        const response= await signInWithEmailAndPassword(
            auth,
            FormLogin.email,
            FormLogin.password
        );
        //console.log(response);
        }catch(e){
            //console.log(e);
            setShowMessage({
                visible:true,
                message: 'Correo y/o contraseña incorrecta',
                color: '#7a0808'
            })
            

        }
    }





  return (
    <View style={styles.root}>
    <Text style={styles.text}>Inicia Session</Text>
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
     <Button  mode="contained" onPress={handleSignIn}>
    Iniciar
  </Button>
  <Text style={styles.textRedirect}
  onPress={()=> navigation.dispatch(CommonActions.navigate({name: 'Register'}))}>
  No tienes Cuenta? Registrate Ahora
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
