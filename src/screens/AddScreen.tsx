import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useMenu, Category } from '../context/MenuContext';

export default function AddItemScreen() {
  const { addItem } = useMenu();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Starters');

  const handleAddItem = () => {
    if (!name || !price || !description) return;
    addItem({ name, price, description, category: selectedCategory });
    setName(''); setPrice(''); setDescription('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Menu Item</Text>

      {/*textinputs for the user to customise the menu */}

      <TextInput style={styles.input} placeholder="Dish Name" placeholderTextColor="#ccc" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Price" placeholderTextColor="#ccc" keyboardType="numeric" value={price} onChangeText={setPrice} />
      <TextInput style={styles.input} placeholder="Description" placeholderTextColor="#ccc" value={description} onChangeText={setDescription} />

      {/*user will click one of these buttons which determine under which section the information on the menu will be updated */}

      <View style={styles.categorySelector}>
        {['Starters', 'Mains', 'Desserts'].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryButton, selectedCategory === cat && styles.activeCategoryButton]}
            onPress={() => setSelectedCategory(cat as Category)}
          >
            <Text style={styles.categoryButtonText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/*this button updates the information on the menu screen and clears the data on the add screen */}

      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>

      <StatusBar style="light" />
    </View>
  );
}

/*(React native. 2025)*/

const styles = StyleSheet.create({
  container: {
     flex: 1, 
     backgroundColor: '#3d1f00', 
     paddingHorizontal: 20, 
     paddingTop: 40,
     justifyContent: 'center'
    },
  title: {
     color: 'white', 
     fontSize: 36, 
     fontWeight: 'bold', 
     textAlign: 'center', 
     marginBottom: 20 
    },
  input: {
     backgroundColor: '#7a4a00', 
     color: 'white', 
     padding: 10, 
     borderRadius: 8, 
     marginVertical: 5 
    },
  categorySelector: {
     flexDirection: 'row', 
     justifyContent: 'space-around', 
     marginVertical: 10 
    },
  categoryButton: {
     paddingVertical: 8, 
     paddingHorizontal: 12, 
     backgroundColor: '#7a4a00', 
     borderRadius: 8 
    },
  activeCategoryButton: {
     backgroundColor: '#a27c00' 
    },
  categoryButtonText: {
     color: 'white', 
     fontWeight: 'bold' 
    },
  addButton: {
     backgroundColor: '#a27c00', 
     padding: 12, 
     borderRadius: 8, 
     alignItems: 'center', 
     marginTop: 10 
    },
  addButtonText: {
     color: 'white', 
     fontSize: 16, 
     fontWeight: 'bold' 
    },
});

//(Byte Grad, Nova Design, Cosden Solutions)