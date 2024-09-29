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
    rootListProduct: {
        marginTop: 10,
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        gap: 20,
        backgroundColor: '#f0f0f0', 
        borderRadius: 10, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, 
        borderColor: '#ccc', 
        borderWidth: 1, 
      },
      Icon: {
        marginLeft: 'auto',
      },
      backgroundImage: {
        flex: 2, 
        resizeMode: 'cover', 
      },
    
    fabProduct:{
        position:'absolute',
        bottom:20,
        right:15

    },
    rootInputsProduct:{
        flexDirection:'row', 
        gap:35

    },
    rootDetail:{
        flex:1,
        padding:20,
        backgroundColor: '#fff',
        gap:20

    },
    textDetail: {
        fontWeight: 'bold',      
        fontSize: 18,            
        color: '#3498db',   
        letterSpacing: 1.5,      
        textShadowColor: '#2980b9',  
        textShadowOffset: { width: 1, height: 1 }, 
        textShadowRadius: 2,   
        fontStyle: 'italic',     
        textTransform: 'uppercase', 
        textAlign: 'left',     
        lineHeight: 25,      
    },
    
    iconSignOut:{
        marginTop:25,
        alignItems:'center'
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 20,
    }
    
})