import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

const ProductCard = ({title, description, price, image, onPress}) => {
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold,
    });

    if (!fontsLoaded) return null;

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: image.uri }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description} numberOfLines={4} ellipsizeMode="tail">{description}</Text>

            <View style={styles.bottomRow}>
                <Text style={styles.price}>€{parseFloat(price).toFixed(2)}</Text>
                <Pressable style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>View more</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#86BC25',
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Poppins_700Bold',
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        margin: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    title: {
        fontSize: 18,
        color: '#000',
        marginBottom: 8,
        fontFamily: 'Poppins_700Bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
        lineHeight: 22,
        fontFamily: 'Poppins_400Regular',
    },
    price: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'Poppins_700Bold',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
        height: 200,
        justifyContent: 'center',
        backgroundColor: '#F2F2F2',
    },
    image: {
        width: 150,
        height: 150,
    },
});

export default ProductCard;
