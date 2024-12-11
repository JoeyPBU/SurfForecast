import React from 'react';
import { View, StyleSheet } from 'react-native';

type LargeInfoCardLeftUpper = {
  children?: React.ReactNode;
};

/* Container Component for Left Upper */
const LargeInfoCardLeftUpper: React.FC<LargeInfoCardLeftUpper> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '70%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 28,
  },
});

export default LargeInfoCardLeftUpper;
