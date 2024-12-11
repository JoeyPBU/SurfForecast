import React from 'react';
import { View, StyleSheet } from 'react-native';

type LargeInfoCardRight = {
  children?: React.ReactNode;
};

/* Container Component for the right of the large info card */
const LargeInfoCardRight: React.FC<LargeInfoCardRight> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      width: '45%',
      height: '60%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginLeft: 25,
      paddingTop: 15,
    },
});

export default LargeInfoCardRight;
