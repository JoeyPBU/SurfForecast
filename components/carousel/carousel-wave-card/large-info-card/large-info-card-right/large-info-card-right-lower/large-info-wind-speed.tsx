import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

type WindSpeedProps = {
  size?: number;
  speed: number;
};

/* Displays the wind speed */
const LargeInfoCardWindSpeed: React.FC<WindSpeedProps> = ({ size = 30, speed }) => {
  return (
    <View style={[styles.container, { width: size * 2, height: size }]}>
      <Text style={styles.text}>
        {speed}m/s
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '20%',
    backgroundColor: 'rgba(169, 169, 169, 0.25)',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#F8F8FF',
    textAlign: 'center',
    lineHeight: 30,
  },
});

export default LargeInfoCardWindSpeed;
