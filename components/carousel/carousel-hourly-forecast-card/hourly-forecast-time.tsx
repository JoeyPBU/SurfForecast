import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

type HourlyForecastTimeProps = {
  size?: number;
  time: string;
};

/* Displays the time for the Hourly Forecast */
const HourlyForecastTime: React.FC<HourlyForecastTimeProps> = ({ size = 60, time }) => {
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
    backgroundColor: 'rgba(169, 169, 169, 0.25)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginRight: 10,
  },
  text: {
    color: '#F8F8FF',
    textAlign: 'center',
    lineHeight: 30,
  },
});

export default HourlyForecastTime;
