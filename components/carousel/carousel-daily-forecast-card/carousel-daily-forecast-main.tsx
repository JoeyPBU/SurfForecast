import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import DailyForecastTile from './daily-forecast-tile/daily-forecast-main';
import DailyForecastRow from './daily-forecast-tile/daily-forecast-row';
import DailyForecastIcon from './daily-forecast-tile/daily-forecast-icon';
import DailyForecastDataCard from './daily-forecast-tile/daily-forecast-data-card/daily-forecast-data-card-main';
import DailyForecastWaveHeight from './daily-forecast-tile/daily-forecast-data-card/daily-forecast-data-wave-height';
import DailyForecastTime from './daily-forecast-tile/daily-forecast-data-card/daily-forecast-data-time';

type DailyForecastCardProps = {
  height?: number;
  beachData: Array<{ id: string; waveHeight: number; time: string }>;
}

/* Formats passed beachData ready for displaying in the daily-forecast card
Finds the highest and lowest waves for each day, for 7 days
Attaches a times and day to each before pushing to the returned list */
const fetchDailyForecast = (beachData) => {
  const dailyForecastData = [];
  
  const hoursData = beachData?.hours || [];
  
  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const startHourIndex = dayOffset * 24;
    const endHourIndex = startHourIndex + 24;

    let minWaveHeight = Infinity;
    let maxWaveHeight = -Infinity;
    let minWaveHeightTime = '';
    let maxWaveHeightTime = '';

    for (let hour = startHourIndex; hour < endHourIndex; hour++) {
      const waveHeight = hoursData[hour]?.waveHeight?.ad || 0;

      if (waveHeight < minWaveHeight) {
        minWaveHeight = waveHeight;
        minWaveHeightTime = `${String(hour % 24).padStart(2, '0')}:00`;
      }
      if (waveHeight > maxWaveHeight) {
        maxWaveHeight = waveHeight;
        maxWaveHeightTime = `${String(hour % 24).padStart(2, '0')}:00`;
      }
    }

    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    const dayLabel = date.toLocaleDateString('en-GB', { weekday: 'short' });

    dailyForecastData.push({
      id: `day-${dayOffset}`,
      day: dayLabel,
      minWaveHeight: minWaveHeight === Infinity ? 0 : minWaveHeight,
      maxWaveHeight: maxWaveHeight === -Infinity ? 0 : maxWaveHeight,
      minWaveHeightTime: minWaveHeightTime || '--:--',
      maxWaveHeightTime: maxWaveHeightTime || '--:--',
    });
  }

  return dailyForecastData;
};

const DailyForecastCard: React.FC<DailyForecastCardProps> = ({ height = 20, beachData }) => {
  return (
    <View style={[styles.container, { height }]}>
      <View><Text style={flatListStyles.text}>Daily Forecast</Text></View>
      <FlatList
        data={fetchDailyForecast(beachData)}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <View style={[flatListStyles.list, flatListStyles.dailyList]}>
              <DailyForecastTile>
                <DailyForecastRow>
                  <DailyForecastIcon rotation={true} />
                  <DailyForecastDataCard>
                    <DailyForecastWaveHeight waveHeight={item.maxWaveHeight} />
                    <DailyForecastTime time={item.maxWaveHeightTime} />
                  </DailyForecastDataCard>
                </DailyForecastRow>
                <DailyForecastRow>
                  <DailyForecastIcon />
                  <DailyForecastDataCard>
                    <DailyForecastWaveHeight waveHeight={item.minWaveHeight} />
                    <DailyForecastTime time={item.minWaveHeightTime} />
                  </DailyForecastDataCard>
                </DailyForecastRow>
              </DailyForecastTile>
              <Text style={[flatListStyles.days, flatListStyles.text]}>{item.day}</Text>
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
  },
});

const flatListStyles = StyleSheet.create({
  list: {
    alignItems: 'center',
  },
  dailyList: {
    margin: 2,
    borderRadius: 10,
    backgroundColor: 'rgba(169, 169, 169, 0.25)',
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
  days: {
    alignSelf: 'center',
  }
});

export default DailyForecastCard;
