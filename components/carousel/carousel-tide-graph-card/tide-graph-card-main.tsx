import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

type TideGraphCardProps = {
  height?: number;
  beachData?: {
    hours: Array<{
      time: string;
      tideLevel: { ad: number };
    }>;
  };
};

/* Displays a Graph reflecting the Tide Level */
const TideGraphCard: React.FC<TideGraphCardProps> = ({ height = 200, beachData }) => {
  const next12HoursData = beachData?.hours?.slice(0, 24) || [];

  const chartData = next12HoursData.map((hourData, index) => ({
    value: Math.max(-5, Math.min(5, hourData.tideLevel?.ad || 0)),
    label: index % 2 === 0 
      ? new Date(hourData.time).getHours().toString()
      : '',
  }));

  const dataValues = chartData.map(data => data.value);
  const minValue = Math.min(...dataValues) - 0.5;
  const maxValue = Math.max(...dataValues) + 0.5;

  return (
    <View style={[styles.container, { height }]}>
      <Text style={styles.title}>Tide Levels</Text>
      <View style={styles.chartContainer}>
        <LineChart
              areaChart
              curved
              data={chartData}
              height={height / 3.6}
              spacing={30}
              initialSpacing={0}
              color1="#ffffff"
              hideDataPoints
              startFillColor1="#dbdbdb"
              startOpacity={0.8}
              endOpacity={0.3}
              yAxisLabelWidth={20}
              hideYAxisText={true}
              maxValue={maxValue}
              mostNegativeValue={minValue}
              stepValue={1}
              endSpacing={10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(169, 169, 169, 0.25)',
    width: '96%',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  chartContainer: {
    backgroundColor: 'rgba(169, 169, 169, 0.25)',
    overflow: 'hidden', 
    borderRadius: 10,
  },
  title: {
    marginLeft: 5,
    color: '#F8F8FF',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  axisLabel: {
    fontSize: 10,
    color: 'gray',
  },
  yAxisLabel: {
    fontSize: 10,
    color: 'gray',
  },
});

export default TideGraphCard;
