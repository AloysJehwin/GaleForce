## Turbine Monitor Dashboard

The Turbine Monitor Dashboard is a React Native application that visually displays real-time wind turbine sensor data. It provides key insights into wind speed, direction, RPM, power output, temperature, and vibration. The app also includes animated fault log alerts and a compass card to indicate wind direction.

---

### Features

* **Real-Time Sensor Data:** Simulated live data for wind speed, direction, RPM, power, temperature, and vibration.
* **Wind Direction Compass:** Animated compass card that rotates based on the wind direction.
* **Line Charts:** Smooth line graphs for each metric, visualizing the latest data trends.
* **Fault Logs:** Rotating fault log messages to simulate turbine alerts and errors.
* **Mobile-Friendly UI:** Responsive card layout optimized for mobile devices.

---

### Screenshots

> (Include screenshots here if available)

---

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/AloysJehwin/GaleForce.git
cd GaleForce
```

2. **Install dependencies**

```bash
npm install
```

3. **Add Assets**

Make sure to add an upward-pointing arrow image to the `assets` folder:

```
/assets/arrow.png
```

4. **Run the app**

```bash
npx react-native run-android
# or
npx react-native run-ios
```

---

### Project Structure

```
.
├── App.js
├── styles/
│   └── styles.js
├── assets/
│   └── arrow.png
├── README.md
└── package.json
```

---

### Dependencies

* `react-native-chart-kit` – For chart visualizations.
* `react-native-svg` – Required peer dependency for charts.
* `react-native-reanimated` – For compass rotation animation.
* `react-native` core libraries.

---

### Customization

* Update `generateBuffedSensorData()` in `App.js` to pull from real sensor APIs if needed.
* Replace `faultLogs` with actual logs from a backend or monitoring system.
* Style and extend the cards using `styles/styles.js`.

---

### License

This project is licensed under the MIT License. You may use, modify, and distribute it as needed.
