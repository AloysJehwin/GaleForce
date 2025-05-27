import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Dimensions, Animated, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import styles from './styles/styles';

const screenWidth = Dimensions.get('window').width;

const getBuffedValue = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

const generateBuffedSensorData = () => ({
  windSpeed: parseFloat(getBuffedValue(25, 60)),
  windDirection: parseFloat(getBuffedValue(0, 360)),
  rpm: parseFloat(getBuffedValue(1800, 3200)),
  powerOutput: parseFloat(getBuffedValue(3500, 7000)),
  temperature: parseFloat(getBuffedValue(60, 120)),
  vibration: parseFloat(getBuffedValue(2.0, 6.5)),
});

const chartColors = {
  windSpeed: '#00bcd4',
  windDirection: '#ff9800',
  rpm: '#8bc34a',
  powerOutput: '#e91e63',
  temperature: '#f44336',
  vibration: '#9c27b0',
};

const faultLogs = [
  { code: 'E101', message: 'High vibration detected' },
  { code: 'E203', message: 'Power output unstable' },
  { code: 'E305', message: 'RPM out of safe range' },
  { code: 'E408', message: 'Wind direction sensor error' },
  { code: 'E512', message: 'Overheat warning' },
];

export default function App() {
  const [sensorData, setSensorData] = useState(generateBuffedSensorData());
  const [history, setHistory] = useState({
    windSpeed: [sensorData.windSpeed],
    rpm: [sensorData.rpm],
    powerOutput: [sensorData.powerOutput],
    temperature: [sensorData.temperature],
    vibration: [sensorData.vibration],
  });

  const [faultIndex, setFaultIndex] = useState(0);
  const [windDirection] = useState(new Animated.Value(sensorData.windDirection));

  useEffect(() => {
    const interval = setInterval(() => {
      const newSensorData = generateBuffedSensorData();
      setSensorData(newSensorData);

      setHistory((prev) => {
        const updated = {};
        for (let key in prev) {
          updated[key] = [...prev[key], newSensorData[key]].slice(-10);
        }
        return updated;
      });

      Animated.timing(windDirection, {
        toValue: newSensorData.windDirection,
        duration: 1000,
        useNativeDriver: true,
      }).start();

    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const faultInterval = setInterval(() => {
      setFaultIndex((prevIndex) => (prevIndex + 1) % faultLogs.length);
    }, 4000);
    return () => clearInterval(faultInterval);
  }, []);

  const sensorLabels = ['windSpeed', 'vibration', 'rpm', 'powerOutput', 'temperature', 'windDirection'];

  const formatLabel = (label) =>
    label.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

  const compassRotation = windDirection.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const renderSensorCard = (key) => {
    if (key === 'windDirection') {
      return (
        <View key={key} style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={[styles.label, { color: chartColors[key], fontWeight: '700' }]}>
              {formatLabel(key)} ({sensorData.windDirection.toFixed(0)}°)
            </Text>
            <View style={styles.compassContainer}>
              <Animated.Image
                source={require('./assets/arrow.png')}
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
            <Text
              style={[styles.label, { color: chartColors[key], fontWeight: '700' }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {formatLabel(key)}
            </Text>
            <Text style={styles.value}>{sensorData[key].toFixed(2)}</Text>
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
              useShadowColorFromDataset: false,
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

  const currentFault = faultLogs[faultIndex];

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
        <Text style={styles.faultText}>
          {currentFault.code} - {currentFault.message}
        </Text>
      </View>
    </View>
  );
}
