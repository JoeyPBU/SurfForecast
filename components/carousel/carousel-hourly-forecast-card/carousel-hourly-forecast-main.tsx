import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import HourlyForecastWaveHeight from './hourly-forecast-wave-height';
import HourlyForecastTime from './hourly-forecast-time';

type HourlyForecastCardProps = {
  height?: number;
  beachData: Array<{ id: string; waveHeight: number; time: string }>;
};

/* Gets the current hour based on the users device, returns int*/
const getCurrentHour = () => {
  const now = new Date();
  const roundedMinutes = Math.round(now.getMinutes() / 60);
  const roundedHour = now.getHours() + roundedMinutes;
  return roundedHour % 24;
};

/* Returns the formatted data for each of the next 24hours from the users*/
const fetchHourlyForecast = (beachData) => {
  const currentHour = getCurrentHour();

  if (!beachData) return [];

  const data = [];
  for (let i = 0; i < 48; i++) {
    const hour = (currentHour + i) % 24;
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(0);

    const formattedTime = date.toTimeString().slice(0, 5);
    const waveHeight = beachData?.hours[hour]?.waveHeight?.ad || 0;

    data.push({
      id: i.toString(),
      time: formattedTime,
      waveHeight: waveHeight,
    });
  }
  return data;
};

/* Contains the FlatList to display the data for Hourly Forecast*/
const HourlyForecastCard: React.FC<HourlyForecastCardProps> = ({ height, beachData }) => {
  return (
    <View style={[styles.container, { height }]}>
      <View>
        <Text style={styles.text}>Hourly Forecast</Text>
      </View>
      <FlatList
        data={fetchHourlyForecast(beachData)}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.list}>
            <HourlyForecastWaveHeight waveHeight={item.waveHeight} />
            <HourlyForecastTime time={item.time} />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(169, 169, 169, 0.25)',
    width: '96%',
    borderRadius: 10,
    padding: 5,
    marginTop: 25,
  },
  text: {
    marginLeft: 5,
    color: '#F8F8FF',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  list: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
});

export default HourlyForecastCard;
