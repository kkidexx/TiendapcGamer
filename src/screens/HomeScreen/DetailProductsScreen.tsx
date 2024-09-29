import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Product } from './HomeScreen';
import { auth, dbRealTime } from '../../config/firebaseConfig';
import { ref, remove, update } from 'firebase/database';

export const DetailProductsScreen = () => {
    const route = useRoute();
    //@ts-ignore
    const { product } = route.params;

    const navigation = useNavigation();

    const [formEdit, setFormEdit] = useState<Product>({
        id: '',
        code: '',
        nameProduct: '',
        price: 0,
        stock: 0,
        description: ''
    });

    useEffect(() => {
        setFormEdit(product);
    }, [product]);

    const handleSetValues = (key: string, value: string) => {
        setFormEdit({ ...formEdit, [key]: value });
    };

    const handleUpdateProduct = async () => {
        if (!formEdit.id) {
            console.log("No se encontró el producto para actualizar.");
            return;
        }

        // Cambiar aquí para usar solo el id
        const dbRef = ref(dbRealTime, 'products/' + auth.currentUser?.uid + '/' + formEdit.id);
        try {
            await update(dbRef, {
                code: formEdit.code,
                nameProduct: formEdit.nameProduct,
                price: formEdit.price,
                stock: formEdit.stock,
                description: formEdit.description
            });

            navigation.goBack();
        } catch (e) {
            console.log("Error al actualizar el producto:", e);
        }
    };

    const handleDeleteProduct = async () => {
        if (!formEdit.id) {
            console.log("No se encontró el producto para eliminar.");
            return;
        }

        // Cambiar aquí para usar solo el id
        const dbRef = ref(dbRealTime, 'products/' + auth.currentUser?.uid + '/' + formEdit.id);
        try {
            await remove(dbRef);
            navigation.goBack();
        } catch (e) {
            console.log("Error al eliminar el producto:", e);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.rootDetail}>
                <View>
                    <Text style={styles.textDetail}>Código:</Text>
                    <TextInput
                        value={formEdit.code}
                        onChangeText={(value) => handleSetValues('code', value)}
                        style={{ width: '100%' }}
                    />
                    <Divider />
                </View>
                <View>
                    <Text style={styles.textDetail}>Nombre:</Text>
                    <TextInput
                        value={formEdit.nameProduct}
                        onChangeText={(value) => handleSetValues('nameProduct', value)}
                        style={{ width: '100%' }}
                    />
                    <Divider />
                </View>
                <View style={styles.rootInputsProduct}>
                    <Text style={styles.textDetail}>Precio:</Text>
                    <TextInput
                        value={formEdit.price.toString()}
                        onChangeText={(value) => handleSetValues('price', value)}
                        style={{ width: '28%' }}
                    />
                    <Text style={styles.textDetail}>Stock:</Text>
                    <TextInput
                        value={formEdit.stock.toString()}
                        onChangeText={(value) => handleSetValues('stock', value)}
                        style={{ width: '28%' }}
                    />
                </View>
                <View>
                    <Text style={styles.textDetail}>Descripción:</Text>
                    <TextInput
                        value={formEdit.description}
                        onChangeText={(value) => handleSetValues('description', value)}
                        multiline
                        numberOfLines={4}
                    />
                </View>
                <Button 
                    mode='contained' 
                    icon='update'
                    onPress={handleUpdateProduct}>
                    Actualizar
                </Button>
                <Button 
                    mode='contained' 
                    icon='delete'
                    onPress={handleDeleteProduct}>
                    Eliminar    
                </Button>
            </View>
        </ScrollView>
    );
};
