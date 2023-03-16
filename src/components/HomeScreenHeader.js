import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HomeScreenHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TCG Marketplace</Text>
    </View>
  );
};

export default HomeScreenHeader;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  container: {
    alignItems: 'center',
    paddingTop: 10,
    minHeight: 50,
    backgroundColor: 'white',
    
  },
});
