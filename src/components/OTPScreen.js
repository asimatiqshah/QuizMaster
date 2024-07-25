import axios from 'axios';
import React, { useState, useRef } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';

const OTPScreen = ({navigation}) => {

  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');

  const refInput2 = useRef(null);
  const refInput3 = useRef(null);
  const refInput4 = useRef(null);
  
  //Success Message
  const successShowMsg = () => {
    showMessage({
      message: 'Success',
      description: 'Successfully Registered Your Email',
      type: 'success',
      icon: 'success',
    });
  };
  //Error Message
  const errorShowMsg = (errorReceived) => {
    showMessage({
      message: 'Error',
      description: errorReceived.message,
      type: 'danger',
      icon: 'danger',
    });
  };

  const handleVerifyOTP = async () => {
    const otpcode = otp1 + otp2 + otp3 + otp4;
    console.log('Verifying OTP:', otpcode);
    // Here you can add your logic to verify OTP
    let newObj = {
      otpcode
    }
    console.log(newObj);

    try {
      let result = await axios.post('https://quiz-node-js.vercel.app/quiz/verifyEmail', newObj);
      successShowMsg();
      if(result){
        navigation.navigate('LoginForm');
      }
      setOtp1("");
      setOtp2("");
      setOtp3("");
      setOtp4("");
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      errorShowMsg(error.response.data);
    }

  };

  const handleOtp1Change = (text) => {
    setOtp1(text);
    if (text.length === 1) {
      refInput2.current.focus();
    }
  };

  const handleOtp2Change = (text) => {
    setOtp2(text);
    if (text.length === 1) {
      refInput3.current.focus();
    }
  };

  const handleOtp3Change = (text) => {
    setOtp3(text);
    if (text.length === 1) {
      refInput4.current.focus();
    }
  };

  const handleOtp4Change = (text) => {
    setOtp4(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.otpContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          value={otp1}
          onChangeText={handleOtp1Change}
          autoFocus
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          value={otp2}
          onChangeText={handleOtp2Change}
          ref={refInput2}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          value={otp3}
          onChangeText={handleOtp3Change}
          ref={refInput3}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          value={otp4}
          onChangeText={handleOtp4Change}
          ref={refInput4}
        />
      </View>
      <Button title="Verify OTP" onPress={handleVerifyOTP} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '20%',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    textAlign: 'center',
    color: 'black'
  },
});

export default OTPScreen;
