import axios from 'axios';
import { Formik, Form, Field, resetForm } from 'formik';
import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import { showMessage, hideMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';


const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please Enter Your Email'),
  password: Yup.string()
    .min(8)
    .required('Please Provide Your Password'),
});

const LoginForm = ({ navigation }) => {
  const [formError, setFormError] = useState('');
  const [isShow,setIsShow] = useState(true);

  const initialValues = {
    email: '',
    password: '',
  };

  useEffect(()=>{
    getDataFromStorage();
  },[]);

  const getDataFromStorage = async ()=>{
    try {
        const token = await AsyncStorage.getItem('isLoggenIn');
        if(!token){
          setIsShow(false);
        }
    } catch (error) {
      console.log(error, 'ERROR');
    }
  }


  //Login Success Message
  const successShowMsg = () => {
    showMessage({
      message: 'Success',
      description: 'Congratulations, Your Are Successfully Login',
      type: 'success',
      icon: 'success',
    });
  };

  const storeUser = async (result) => {
    try {
      await AsyncStorage.setItem('userLogin_token', JSON.stringify(result.data.data.email));
      await AsyncStorage.setItem('isLoggenIn', JSON.stringify(true));
    } catch (error) {
      console.log(error);
    }
  }


  const handlauthUser = async (formdata) => {
    let { email, password } = formdata;
    try {
      let result = await axios.post('https://quiz-node-js.vercel.app/quiz/login', {
        email: email,
        password: password,
      });
      if (result.data.status) {
        storeUser(result);
        successShowMsg();
        // values.email='';
        // values.password='';
        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      console.log(error.response.data);
      setFormError(error.response.data.message);
      //Reference for handling error in async await : https://rapidapi.com/guides/handle-axios-errors
    }
  };

  return (
    <View style={styles.container}>
      <View style={{display: isShow ? 'none':'true'}}>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          resizeMode="stretch"
          source={require('../images/shape.png')}
          style={{
            width: '100%',
            height: 300,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../images/Quizzless.png')}
            style={{ width: 198, height: 176 }}
          />
        </ImageBackground>
        <View
          style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.displayHeading1}>Sign in to continue</Text>
        </View>
        <Formik
          initialValues={initialValues}
          validationSchema={SigninSchema}
        >
          {({
            values,
            errors,
            handleChange,
            setFieldTouched,
            isValid,
            touched,
            handleSubmit,
            resetForm
          }) => (
            <View>
              <TextInput
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                autoCapitalize={false}
                placeholder="Email Address"
                placeholderTextColor="#808080"
                style={{
                  width: '85%',
                  fontSize: 20,
                  borderRadius: 10,
                  alignSelf: 'center',
                  paddingHorizontal: 20,
                  marginTop: 30,
                  height: 68,
                  backgroundColor: 'white',
                  borderColor: 'gray',
                  borderWidth: 1,
                  color: 'black',
                }}
              />
              {touched.email && errors.email && <Text style={styles.fault_red_16}>{errors.email}</Text>}
              <TextInput
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                autoCapitalize={false}
                placeholder="Password"
                placeholderTextColor="#808080"
                style={{
                  width: '85%',
                  fontSize: 20,
                  borderRadius: 10,
                  alignSelf: 'center',
                  paddingHorizontal: 20,
                  marginTop: 30,
                  height: 68,
                  backgroundColor: 'white',
                  borderColor: 'gray',
                  borderWidth: 1,
                  color: 'black',
                }}
              />
              {touched.password && errors.password && (
                <Text style={styles.fault_red_16}>{errors.password}</Text>
              )}
              <TouchableOpacity
                disabled={!isValid}
                type="submit"
                onPress={() => {
                  handlauthUser(values),
                    resetForm({
                      values: {
                        email: '',
                        password: ''
                      }
                    })
                }}
                style={[styles.darkBtn, { backgroundColor: isValid ? '#6949FE' : '#A5C9CA' }]}>
                <Text style={styles.headingBtn}>Sign In</Text>
              </TouchableOpacity>



              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                <Text>Get started with us  — </Text>
                <Pressable onPress={() => navigation.navigate('SignupForm')}>
                  <Text style={{ color: '#1877F2', fontSize: 16 }}> Sign Up now!</Text>
                </Pressable>
              </View>
              <Text style={styles.fault_red}>{formError}</Text>
            </View>
          )}
        </Formik>
      </View>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size='large' animating={isShow} />
      </View>
    </View>
  );
};
export default LoginForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F1147',
    flex: 1,
  },
  displayHeading1: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'Artegra Soft Bold',
  },
  darkBtn: {
    width: 295,
    height: 68,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  headingBtn: {
    fontSize: 26,
    color: 'white',
    fontFamily: 'Artegra Soft Bold',
  },
  fault_red: {
    marginTop: 20,
    fontSize: 20,
    color: 'red',
    alignSelf: 'center',
    fontFamily: 'Artegra Soft Bold'
  },
  fault_red_16: {
    marginTop: 10,
    fontSize: 16,
    color: 'red',
    paddingLeft: 30,
    fontFamily: 'Artegra Soft Bold'
  }
});
