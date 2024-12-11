import React from 'react';
import { View, StyleSheet } from 'react-native';

type DailyForecastCard = {
  children?: React.ReactNode;
};

/* Container for the Daily Forecast Card, setting the flexDirection to row */
const DailyForecastCard: React.FC<DailyForecastCard> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '96%',
    flexDirection: 'row',
  },
});

export default DailyForecastCard;
