import React, { useState } from 'react';
import { Button, Divider, IconButton, Modal, Portal, Snackbar, Text, TextInput } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { View } from 'react-native';
import { dbRealTime } from '../../../config/firebaseConfig';
import { push, ref, set } from 'firebase/database';

// Interface - Props
interface Props {
    showModaProduct: boolean;
    setshowModaProduct: React.Dispatch<React.SetStateAction<boolean>>; // mejor tipado para la función de estado
}

// Interface - Message
interface ShowMessage {
    visible: boolean;
    message: string;
    color: string;
}

// Interface - formProduct
interface FormProduct {
    code: string;
    nameProduct: string;
    price: number;
    stock: number;
    description: string;
}

export const NewProductComponent = ({ showModaProduct, setshowModaProduct }: Props) => {
    // Hook useState: cambiar estado del mensaje
    const [showMessage, setShowMessage] = useState<ShowMessage>({
        visible: false,
        message: '',
        color: '#fff',
    });

    // Hook useState: cambiar el estado del formulario
    const [formProduct, setformProduct] = useState<FormProduct>({
        code: '',
        nameProduct: '',
        price: 0,
        stock: 0,
        description: '',
    });

    // Función: actualizar estado del formulario
    const handleSetValues = (key: string, value: string) => {
        setformProduct({ ...formProduct, [key]: value });
    };

    // Función: guardar los productos
    const handleSaveProduct = async () => {
        if (!formProduct.code || !formProduct.nameProduct || !formProduct.price || !formProduct.stock || !formProduct.description) {
            setShowMessage({
                visible: true,
                message: 'Completa todos los campos',
                color: '#7a0808',
            });
            return;
        }

        //console.log(formProduct);
        //1 crear crear o redifreccionar la tabla de la base de datos
        const dbRef =ref (dbRealTime, 'products');
        //2 crear una coleccion que agregue los datos en la dbRef
        const saveProduct = push(dbRef);
        //3 almacenar los datos en la base de datos
        try {
        await set(saveProduct, formProduct);
        //cerrar modal
        setshowModaProduct(false);
        
    }catch(e){
        console.log(e);
        setShowMessage({
            visible:true,
            message:'No se completo la transaccion, intentalo mas tarde',
            color:'#7a0808'
        })
    }

    }

    return (
        <>
            <Portal>
                <Modal visible={showModaProduct} contentContainerStyle={styles.modal}>
                    <View style={styles.Header}>
                        <Text variant="headlineSmall">Nuevo Producto</Text>
                        <View style={styles.icon}>
                            <IconButton icon="close" size={30} onPress={() => setshowModaProduct(false)} />
                        </View>
                    </View>
                    <Divider />
                    <TextInput label="Codigo" mode="outlined" onChangeText={(value) => handleSetValues('code', value)} />
                    <TextInput label="Nombre" mode="outlined" onChangeText={(value) => handleSetValues('nameProduct', value)} />
                    <View style={styles.rootInputsProduct}>
                        <TextInput
                            label="Precio"
                            mode="outlined"
                            keyboardType="numeric"
                            onChangeText={(value) => handleSetValues('price', value)}
                            style={{ width: '45%' }}
                        />
                        <TextInput
                            label="Stock"
                            mode="outlined"
                            keyboardType="numeric"
                            onChangeText={(value) => handleSetValues('stock', value)}
                            style={{ width: '45%' }}
                        />
                    </View>
                    <TextInput
                        label="Descripción"
                        mode="outlined"
                        multiline
                        numberOfLines={3}
                        onChangeText={(value) => handleSetValues('description', value)} // Corregido: sin espacio en 'description'
                    />
                    <Button mode="contained" onPress={handleSaveProduct}>
                        Agregar
                    </Button>
                </Modal>

                <Snackbar
                    visible={showMessage.visible}
                    onDismiss={()=>setShowMessage({...showMessage,visible:false})}
                    style={{...styles.message,
                    backgroundColor: showMessage.color

                }}>

                    {showMessage.message}
      
                </Snackbar>
            </Portal>
        </>
    );
};
