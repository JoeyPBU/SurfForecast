import React from 'react';
import { View, StyleSheet } from 'react-native';

type LiveFeedVideoBarProps = {
  children?: React.ReactNode;
};

/* Displays a mock progress-bar using styling */
const LiveFeedVideoBar: React.FC<LiveFeedVideoBarProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View style={styles.progressBarFill} />
          <View style={styles.notchesContainer}>
            {Array.from({ length: 10 }).map((_, index) => (
              <View key={index} style={[styles.notch, { left: `${index * 10}%` }]} />
            ))}
          </View>
        </View>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '5%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarContainer: {
    width: '96%',
    height: 8,
    position: 'relative',
  },
  progressBarBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '10%',
    height: '100%',
    backgroundColor: 'red',
  },
  notchesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notch: {
    width: 1,
    height: '100%',
    backgroundColor: 'black',
  },
});

export default LiveFeedVideoBar;
