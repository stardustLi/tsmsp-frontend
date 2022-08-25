import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const NotFound: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>404 Not Found!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default NotFound;
