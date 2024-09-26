import { StyleSheet } from "react-native";

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
    HeaderHome: {
        flexDirection: 'row',
        gap:15,
        alignItems:'center'
    }
})