import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreens } from '../screens/RegisterScreens';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from '../theme/styles';
import { DetailProductsScreen } from '../screens/HomeScreen/DetailProductsScreen';



//interface - Routes (StacksScreens)
interface Routes{
    name:string;
    screen: () => JSX.Element; // compoenete React
    headerShow?: boolean; //propiedad opcional
}

//arreglo - routes cuando el usuario no este autenticado
const routesNoAuth: Routes[] = [
    {name: 'Login', screen: LoginScreen},
    {name: 'Register', screen: RegisterScreens},
    {name: 'Home', screen: HomeScreen},
    {name: 'Detalle', screen: DetailProductsScreen, headerShow: true}
  
];



const Stack = createStackNavigator();



export const StackNavigator = () => {


  //hook useState: verificar si esta autenticado o no 
  const [isAuth, setisAuth] = useState<boolean>(false);

  //hook useState: controlar carga inicial
  const [isLoading, setisLoading] = useState<boolean>(false)

  //hook useEffect: Validar el estado de autentificacion
  useEffect(()=>{
    //cargar el activity indicator

    setisLoading(true);
    onAuthStateChanged(auth, (user)=>{
      if(user){// exirte autentificacion
          //console.log(user);
          setisAuth(true);
      }
      //ocultar el activity indicator
      setisLoading(false);
          
    });
  }, []);



  return (
    <>

  {isLoading ? (
    <View style={styles.rootActivity}>
        <ActivityIndicator animating={true} size={35} />
    </View>
    ):(
    <Stack.Navigator initialRouteName={isAuth ? 'Home' : 'Login'}>
        {

            routesNoAuth.map((item,index)=>(
              <Stack.Screen key={index}
                name={item.name} 
                options={{headerShown: item.headerShow ?? false}} 
                component={item.screen} />

              ))
        }
    </Stack.Navigator>
    )}

    </>
  );
}