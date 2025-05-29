# Turbine Monitor Dashboard - GaleForce

This React Native application displays real-time sensor data from wind turbines in a visual dashboard format. It simulates data for wind speed, wind direction, RPM, power output, temperature, vibration, and displays fault logs dynamically.

## Features

* Real-time sensor simulation for turbine parameters
* Graphical charts for each sensor value using `react-native-chart-kit`
* Compass visualization for wind direction
* Dynamic fault log display that cycles through messages
* Optimized layout using `FlatList` for performance

## Technologies Used

* React Native
* Expo
* React Native Chart Kit
* Custom Compass Component for wind direction

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AloysJehwin/GaleForce.git
   cd GaleForce
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the app:

   ```bash
   expo start
   ```

## Folder Structure

```
/GaleForce
├── App.js
├── components/
│   └── Compass.js
├── styles/
│   └── styles.js
└── assets/
    └── arrow.png
```

## Screenshot

<img src="https://github.com/AloysJehwin/GaleForce/blob/master/Screenshots/Screenshot_20250527_235853_Expo%20Go.jpg" width="300" />

## License

This project is licensed under the MIT License.

---

For more information or issues, contact [AloysJehwin](https://github.com/AloysJehwin).
