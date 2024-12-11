import React from 'react';
import { View, StyleSheet } from 'react-native';

type DailyForecastCard = {
  children?: React.ReactNode;
};

/* Container Element for Daily Forecast time and wave height*/
const DailyForecastCard: React.FC<DailyForecastCard> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 5,
    width: '100%',
  },
});

export default DailyForecastCard;
