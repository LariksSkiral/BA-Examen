import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import { useState } from 'react';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

const ProductDetail = ({route}) => {
    const {title, description, price, image} = route.params;
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => { if (quantity > 1) setQuantity(quantity - 1); };

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold,
    });

    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image source={image} style={styles.image} resizeMode="contain" />
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>

                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Prijs</Text>
                        <View style={styles.priceBadge}>
                            <Text style={styles.priceValue}>€{parseFloat(price).toFixed(2)}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionLabel}>Aantal</Text>
                    <View style={styles.quantityRow}>
                        <Pressable onPress={decreaseQuantity} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>−</Text>
                        </Pressable>

                        <Text style={styles.quantityValue}>{quantity}</Text>

                        <Pressable onPress={increaseQuantity} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>+</Text>
                        </Pressable>

                        <View style={styles.totalContainer}>
                            <Text style={styles.totalLabel}>Totaal</Text>
                            <Text style={styles.totalValue}>€{(quantity * parseFloat(price)).toFixed(2)}</Text>
                        </View>
                    </View>

                    <Pressable style={styles.cartButton}>
                        <Text style={styles.cartButtonText}>Toevoegen aan winkelwagen</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageContainer: {
        width: '100%',
        height: 280,
        backgroundColor: '#F2F2F2',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        padding: 24,
    },
    title: {
        fontSize: 24,
        color: '#000',
        fontFamily: 'Poppins_700Bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
        color: '#555',
        lineHeight: 24,
        fontFamily: 'Poppins_400Regular',
        marginBottom: 24,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    priceLabel: {
        fontSize: 16,
        color: '#555',
        fontFamily: 'Poppins_500Medium',
    },
    priceBadge: {
        backgroundColor: '#86BC25',
        paddingHorizontal: 18,
        paddingVertical: 8,
    },
    priceValue: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'Poppins_700Bold',
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginBottom: 20,
    },
    sectionLabel: {
        fontSize: 16,
        color: '#555',
        fontFamily: 'Poppins_500Medium',
        marginBottom: 12,
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    quantityButton: {
        backgroundColor: '#86BC25',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButtonText: {
        color: '#fff',
        fontSize: 22,
        fontFamily: 'Poppins_700Bold',
        lineHeight: 26,
    },
    quantityValue: {
        fontSize: 22,
        fontFamily: 'Poppins_700Bold',
        color: '#000',
        marginHorizontal: 20,
        minWidth: 24,
        textAlign: 'center',
    },
    totalContainer: {
        marginLeft: 'auto',
        alignItems: 'flex-end',
    },
    totalLabel: {
        fontSize: 13,
        color: '#888',
        fontFamily: 'Poppins_400Regular',
    },
    totalValue: {
        fontSize: 22,
        color: '#000',
        fontFamily: 'Poppins_700Bold',
    },
    cartButton: {
        backgroundColor: '#86BC25',
        paddingVertical: 16,
        alignItems: 'center',
    },
    cartButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
    },
});

export default ProductDetail;
