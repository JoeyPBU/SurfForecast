import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

type SwellPeriodProps = {
  size?: number;
  time?: number;
};

/* Displays the period of the swell after formatting it for readability */
const LargeInfoCardSwellPeriod: React.FC<SwellPeriodProps> = ({ size = 30, time }) => {
  const roundedTime = time !== undefined ? Math.round(time) : null;

  return (
    <View style={[styles.container, { width: size * 1.5, height: size }]}>
      {roundedTime !== null && (
        <Text style={styles.text}>{roundedTime}s</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(169, 169, 169, 0.25)',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  text: {
    color: '#F8F8FF',
    textAlign: 'center',
    lineHeight: 30,
  },
});

export default LargeInfoCardSwellPeriod;
