import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const sendOtp = () => {
    if (mobile.length === 10) {
      setOtpSent(true);
      Alert.alert('OTP Sent', '123456 (mocked)');
    } else {
      Alert.alert('Error', 'Enter a valid 10-digit mobile number');
    }
  };

  const verifyOtp = () => {
    if (otp === '123456') {
      navigation.replace('Dashboard');
    } else {
      Alert.alert('Invalid OTP', 'Try again');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Turbine Monitor</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Mobile Number"
        keyboardType="numeric"
        maxLength={10}
        value={mobile}
        onChangeText={setMobile}
      />

      {otpSent && (
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="numeric"
          maxLength={6}
          value={otp}
          onChangeText={setOtp}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={otpSent ? verifyOtp : sendOtp}>
        <Text style={styles.buttonText}>{otpSent ? 'Verify OTP' : 'Send OTP'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center', padding: 24,
  },
  title: {
    fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 30,
  },
  input: {
    width: '100%', backgroundColor: '#1e1e1e', padding: 12, borderRadius: 10, marginBottom: 16, color: '#fff',
  },
  button: {
    backgroundColor: '#00bcd4', padding: 14, borderRadius: 10, width: '100%', alignItems: 'center',
  },
  buttonText: {
    color: '#fff', fontWeight: 'bold', fontSize: 16,
  },
});
