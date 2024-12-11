import React from 'react';
import { View, StyleSheet, TouchableOpacity , Image } from 'react-native';

type CarouselOptionsIconProps = {
  size?: number;
  onPress: () => void;
};

const icon = require('../../../assets/options-icon.png');

/* Displays an Icon to navigate the user to Account.js*/
const CarouselOptionsIcon: React.FC<CarouselOptionsIconProps> = ({ size = 50, onPress }) => {
  return (
      <TouchableOpacity onPress={onPress} style={[styles.container, { width: size, height: size }]}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    padding: 1,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  
});

export default CarouselOptionsIcon;