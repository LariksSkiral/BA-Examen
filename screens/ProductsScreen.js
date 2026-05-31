import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Switch, Button } from 'react-native';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import BlogCard from '../components/NewsCard';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

const categoryNames = {
  "": "All",
  "6a158d8460083e795c17b4a4": "Sweaters",
  "6a158d8c24318a82f54fa5b3": "Hoodies",
  "6a158dad0f342894227c08cb": "Baby & kinderartikelen",
  "6a158dc1740b0847b523be8b": "Dagelijkse gebruiksartikelen",
  "6a158dcf2ceaf3cd323aa0cd": "Kleine accessoires",
};


const ProductsScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");
  const [showFeatured, setShowFeatured] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSortOption("price-asc");
  };



  useEffect(() => {
    fetch('https://api.webflow.com/v2/sites/6a131ee6b52abe1fe77b2cd8/products',
    {
      headers: {
        Authorization:
        'Bearer f793e95b30f968796a1656b22d14563588d2c9c5f8bb59b9444c39d36f3e712e',
      },
    },
    )
      .then((response) => response.json())
      .then((data) => setProducts(
        data.items.map((item) => ({
          id: item.product.id,
          title: item.product.fieldData.name,
          description: item.product.fieldData.description,
          price: item.skus[0].fieldData.price.value / 100,
          image: { uri: item.skus[0].fieldData["main-image"].url },
          category: categoryNames[item.product.fieldData.category[0]] || "Unknown category",
        })),
      ))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      (selectedCategory === "" || p.category === selectedCategory) &&
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "title-asc") return a.title.localeCompare(b.title);
    if (sortOption === "title-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <ScrollView>
        
            <Text style={styles.sectionTitle}>Onze producten</Text>

            <TextInput
              placeholder="Zoek producten..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
              placeholderTextColor="#888"
            />

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Categorie</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedCategory}
                  onValueChange={setSelectedCategory}
                  style={styles.picker}
                >
                  <Picker.Item label="All" value="" />
                  <Picker.Item label="Sweaters" value="Sweaters" />
                  <Picker.Item label="Hoodies" value="Hoodies" />
                  <Picker.Item label="Baby & kinderartikelen" value="Baby & kinderartikelen" />
                  <Picker.Item label="Dagelijkse gebruiksartikelen" value="Dagelijkse gebruiksartikelen" />
                  <Picker.Item label="Kleine accessoires" value="Kleine accessoires" />
                </Picker>
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Sorteren</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={sortOption}
                  onValueChange={setSortOption}
                  style={styles.picker}
                >
                  <Picker.Item label="Prijs: laag naar hoog" value="price-asc" />
                  <Picker.Item label="Prijs: hoog naar laag" value="price-desc" />
                  <Picker.Item label="Naam: A tot Z" value="title-asc" />
                  <Picker.Item label="Naam: Z tot A" value="title-desc" />
                </Picker>
              </View>
            </View>

            <View style={styles.resetButtonContainer}>
              <Button title="Filters wissen" onPress={resetFilters} color="#86BC25" />
            </View>

            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                image={product.image}
                onPress={() =>
                  navigation.navigate('ProductDetail', {
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    image: product.image,
                  })}
              />
            ))}
    
    

    
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 22,
    marginVertical: 20,
    marginLeft: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#000',
  },
  searchInput: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F2F2F2',
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#000',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterSection: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 13,
    color: '#555',
    fontFamily: 'Poppins_500Medium',
    marginBottom: 6,
  },
  pickerContainer: {
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  resetButtonContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    marginTop: 4,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    borderBottomWidth: 2,
    borderBottomColor: '#E0E0E0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  tabButtonActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#86BC25',
    backgroundColor: '#fff',
  },
  tabButtonText: {
    fontSize: 15,
    color: '#888',
    fontFamily: 'Poppins_500Medium',
  },
  tabButtonTextActive: {
    color: '#000',
    fontFamily: 'Poppins_700Bold',
  },
});

export default ProductsScreen;
