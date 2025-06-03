import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Dimensions, Animated, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import styles from '../styles/styles';

const screenWidth = Dimensions.get('window').width;

// Convert cardinal to degree
const cardinalToDegrees = (direction) => {
  const map = {
    N: 0,
    NE: 45,
    E: 90,
    SE: 135,
    S: 180,
    SW: 225,
    W: 270,
    NW: 315,
  };
  return map[direction.toUpperCase()] || 0;
};

// Chart colors for each sensor
const chartColors = {
  wind_speed: '#00bcd4',
  wind_direction: '#ff9800',
  rpm: '#8bc34a',
  power_output: '#e91e63',
  temperature: '#f44336',
  vibration: '#9c27b0',
};

export default function DashboardScreen() {
  const [sensorData, setSensorData] = useState({});
  const [history, setHistory] = useState({
    wind_speed: [],
    rpm: [],
    power_output: [],
    temperature: [],
    vibration: [],
  });

  const [windDirectionAnim] = useState(new Animated.Value(0));
  const [faultMessage, setFaultMessage] = useState('');

  const fetchSensorData = async () => {
    try {
      const response = await fetch('https://p0ul64xxyc.execute-api.us-east-1.amazonaws.com/default/latest');
      const result = await response.json();

      const { data } = result;
      const windDirDeg = cardinalToDegrees(data.wind_direction);

      setSensorData(data);
      setFaultMessage(data.fault_log || 'No faults');

      setHistory((prev) => {
        const updated = {};
        for (let key of Object.keys(prev)) {
          updated[key] = [...prev[key], data[key]].slice(-10);
        }
        return updated;
      });

      Animated.timing(windDirectionAnim, {
        toValue: windDirDeg,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchSensorData(); // initial
    const interval = setInterval(fetchSensorData, 3000);
    return () => clearInterval(interval);
  }, []);

  const sensorLabels = ['wind_speed', 'vibration', 'rpm', 'power_output', 'temperature', 'wind_direction'];

  const formatLabel = (label) =>
    label.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (str) => str.toUpperCase());

  const compassRotation = windDirectionAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const renderSensorCard = (key) => {
    if (!sensorData[key] && key !== 'wind_direction') return null;

    if (key === 'wind_direction') {
      return (
        <View key={key} style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={[styles.label, { color: chartColors[key], fontWeight: '700' }]}>
              {formatLabel(key)} ({sensorData.wind_direction || 'N/A'})
            </Text>
            <View style={styles.compassContainer}>
              <Animated.Image
                source={require('../assets/arrow.png')}
                style={[styles.arrow, { transform: [{ rotate: compassRotation }] }]}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      );
    }

    return (
      <View key={key} style={styles.card}>
        <View style={styles.cardContent}>
          <View style={[styles.valueContainer, { marginRight: 2 }]}>
            <Text style={[styles.label, { color: chartColors[key], fontWeight: '700' }]} numberOfLines={1}>
              {formatLabel(key)}
            </Text>
            <Text style={styles.value}>{sensorData[key]?.toFixed(2) ?? 'N/A'}</Text>
          </View>
          <LineChart
            data={{ labels: [], datasets: [{ data: history[key] }] }}
            width={screenWidth * 0.55}
            height={70}
            chartConfig={{
              backgroundGradientFrom: '#222222',
              backgroundGradientTo: '#222222',
              color: () => chartColors[key],
              strokeWidth: 2,
              fillShadowGradient: 'transparent',
              fillShadowGradientOpacity: 0,
              propsForBackgroundLines: {
                stroke: '#444444',
                strokeDasharray: '5,5',
              },
            }}
            withDots={false}
            withInnerLines={true}
            withOuterLines={true}
            withHorizontalLabels={false}
            withVerticalLabels={false}
            style={styles.chart}
            bezier
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Turbine Monitor Dashboard</Text>

      <FlatList
        data={sensorLabels}
        renderItem={({ item }) => renderSensorCard(item)}
        keyExtractor={(item) => item}
      />

      <View style={styles.faultContainer}>
        <Text style={[styles.label, { fontWeight: '700', color: '#ff4444', marginBottom: 4 }]}>
          Fault Logs
        </Text>
        <Text style={styles.faultText}>{faultMessage}</Text>
      </View>
    </View>
  );
}
