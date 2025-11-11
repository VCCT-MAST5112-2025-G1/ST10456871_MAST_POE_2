import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useMenu } from '../context/MenuContext';

export default function HomeScreen() {
  const { starters, mains, desserts, deleteItem } = useMenu();

  const renderItems = (items: any[], category: string) =>
    items.map((item, index) => (
      <View key={index} style={styles.menuItem}>
        <View style={styles.menuTextContainer}>
          <Text style={styles.menuText}>{item.name} - R{item.price}</Text>
          <Text style={styles.menuDesc}>{item.description}</Text>
        </View>
        <TouchableOpacity onPress={() => deleteItem(category as any, index)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    ));

  const totalItems = starters.length + mains.length + desserts.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Starters</Text>
        {renderItems(starters, 'Starters')}

        <Text style={styles.sectionTitle}>Mains</Text>
        {renderItems(mains, 'Mains')}

        <Text style={styles.sectionTitle}>Desserts</Text>
        {renderItems(desserts, 'Desserts')}
      </ScrollView>

      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>Total Items: {totalItems}</Text>
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1, 
     backgroundColor: '#3d1f00', 
     paddingHorizontal: 20, 
     paddingTop: 40 
    },
  title: {
     color: 'white', 
     fontSize: 36, 
     fontWeight: 'bold', 
     textAlign: 'center', 
     marginBottom: 10 
    },
  scrollContainer: {
     paddingBottom: 50 
    },
  sectionTitle: {
     color: 'white', 
     fontSize: 28, 
     fontWeight: 'bold', 
     marginTop: 15 
    },
  menuItem: {
     flexDirection: 'row', 
     justifyContent: 'space-between', 
     backgroundColor: '#5a2e00', 
     padding: 10, 
     borderRadius: 8, 
     marginVertical: 5 
    },
  menuTextContainer: {
     flex: 1 
    },
  menuText: {
     color: 'white', 
     fontSize: 18, 
     fontWeight: 'bold' 
    },
  menuDesc: {
     color: '#ddd', 
     fontSize: 14 
    },
  deleteButton: {
     color: 'red', 
     fontWeight: 'bold', 
     marginLeft: 10 
    },
  counterContainer: {
     padding: 15, 
     backgroundColor: '#7a4a00', 
     borderRadius: 8, 
     marginTop: 10, 
     alignItems: 'center' 
    },
  counterText: {
     color: 'white', 
     fontSize: 18, 
     fontWeight: 'bold' 
    },
});