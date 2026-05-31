import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

const NewsCard = ({title, description, image, onPress}) => {
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
    });

    if (!fontsLoaded) return null;

    return (
        <Pressable style={styles.card} onPress={onPress}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: image.uri }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>

            <View style={styles.bottomRow}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Lees meer</Text>
                </View>
            </View>
        </Pressable>
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
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageContainer: {
        marginBottom: 20,
        height: 200,
        overflow: 'hidden',
        marginHorizontal: -20,
        marginTop: -20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default NewsCard;
