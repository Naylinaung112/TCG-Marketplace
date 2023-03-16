import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Overlay = () => {
  return (
    <LinearGradient colors={['transparent', 'white']} style={styles.overlay} />
  );
};

export default React.memo(Overlay);

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: 40,
    position: 'absolute',
    bottom: -1,
    zIndex: 2,
  },
});
