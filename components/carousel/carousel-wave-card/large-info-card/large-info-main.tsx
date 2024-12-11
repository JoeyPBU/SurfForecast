import React from 'react';
import { View, StyleSheet } from 'react-native';

type LargeInfoCard = {
  children?: React.ReactNode;
};

/* Parent component for the Large Info Card in the Wave Card */
const LargeInfoCard: React.FC<LargeInfoCard> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
});

export default LargeInfoCard;
