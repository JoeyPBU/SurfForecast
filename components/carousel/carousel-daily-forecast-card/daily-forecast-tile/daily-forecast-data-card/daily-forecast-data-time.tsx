import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

type DailyForecastTimeProps = {
  size?: number;
  time: string;
};

/* Displays the Forecast Time */
const DailyForecastTime: React.FC<DailyForecastTimeProps> = ({ size = 45, time }) => {
  return (
    <View style={[styles.container, { width: size, height: size / 1.5  }]}>
      <Text style={styles.text}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    color: '#F8F8FF',
    textAlign: 'center',
    lineHeight: 15,
  },
});

export default DailyForecastTime;
