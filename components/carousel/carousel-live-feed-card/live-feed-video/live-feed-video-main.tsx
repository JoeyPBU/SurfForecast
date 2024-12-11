import React from 'react';
import { View, StyleSheet } from 'react-native';

type LiveFeedVideoCardProps = {
  children?: React.ReactNode;
};

/* Container Component for LiveFeedVideo */
const LiveFeedVideoCard: React.FC<LiveFeedVideoCardProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(128, 128, 128)',
    borderRadius: 5,
    width: '94%',
    height: '60%',
    marginTop: '4%',
    paddingBottom: '2%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default LiveFeedVideoCard;
