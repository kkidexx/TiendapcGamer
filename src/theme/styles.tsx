import { StyleSheet } from "react-native";
import { Icon } from "react-native-paper";

export const styles=StyleSheet.create({
    root:{
        flex:1,
        justifyContent:'center',
        gap:10
    },
    text:{
        fontSize: 25,
        fontWeight: 'bold',
        textAlign:'center'
    },
    message:{
        width: '90%'
    },
    textRedirect: {
        marginTop:20,
        textAlign:'center',
        fontSize:16,
        fontWeight:'bold',
        color:'#705aa9'
    },
    rootActivity:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    },
    rootHome:{
        flex:1,
        marginHorizontal:20,
        marginVertical:50
    },
    Header: {
        flexDirection: 'row',
        gap:15,
        alignItems:'center'
    },
    icon:{
        alignItems:'flex-end',
        flex:1
    },
    modal:{
        padding:20,
        marginHorizontal:20,
        backgroundColor: '#fff',
        borderRadius:10,
        gap:10
    },
    rootListProduct:{
        marginTop:10,
        flexDirection:'row',
        padding:10,
        alignItems:'center',
        gap:20
    },
    fabProduct:{
        position:'absolute',
        bottom:20,
        right:15

    },
    rootInputsProduct:{
        flexDirection:'row', 
        gap:35

    }
})