import React from 'react';
import { View, StyleSheet } from 'react-native';

type DailyForecastCard = {
  children?: React.ReactNode;
};

/* Container for DailyForecast Card */
const DailyForecastCard: React.FC<DailyForecastCard> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
  },
});

export default DailyForecastCard;
