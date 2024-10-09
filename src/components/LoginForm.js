import axios from 'axios';
import { Formik, Form, Field, resetForm } from 'formik';
import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import { showMessage, hideMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { addEventListener } from "@react-native-community/netinfo";
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
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { increment, networkStatus, oldNetworkStatusHandler } from '../redux/reducers/connectionSlice';
import { useIsFocused } from '@react-navigation/native';


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
  const [isShow, setIsShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [hideNetworkStatusBar, setHideNetworkStatusBar] = useState('block');
  const [reLoadingPage, setReLoadingPage] = useState(true);
  const [whiteScreenShow,setWhiteScreenShow] = useState(false);


  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const isConnectedStatus = useSelector(({ connectionSlice }) => connectionSlice.isConnected);
  //Internet Connection UseEffect
  useEffect(() => {
    let timeoutId;
    setWhiteScreenShow(false);
    // Subscribe
    const unsubscribe = addEventListener(state => {
      if (state.isConnected == true) {
        setHideNetworkStatusBar('none');
        setReLoadingPage(true);
      } else {
        setHideNetworkStatusBar('block');
        setReLoadingPage(false);
        setWhiteScreenShow(true);
      }
      dispatch(networkStatus(state.isConnected));
    });

    return () => {
      // Clear Timout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // Unsubscribe
      unsubscribe();
    }
  },[isFocused]);


  const initialValues = {
    email: '',
    password: '',
  };

  useEffect(() => {
    getDataFromStorage();
  }, [reLoadingPage]);

  const getDataFromStorage = async () => {
    try {
      const token = await AsyncStorage.getItem('isLoggenIn');
      if (!token) {
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

    // //check internet connection
    // if(!isConnectedStatus)return false;

    let { email, password } = formdata;
    try {
      let result = await axios.post('https://quiz-node-js.vercel.app/quiz/login', {
        email: email,
        password: password,
      });
      if (result.data.status) {
        storeUser(result);
        successShowMsg();
        setIsLoading(false);
        // values.email='';
        // values.password='';
        navigation.navigate('AppContainer');
      }
    } catch (error) {
      console.log(error.response.data);
      setFormError(error.response.data.message);
      setIsLoading(false);
      //Reference for handling error in async await : https://rapidapi.com/guides/handle-axios-errors
    }
  };

  return (
    <>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1, backgroundColor: 'white',
        position:'absolute',
        width:'100%',
        height:'100%',
        zIndex:2,
        display:whiteScreenShow?'block':'none'
      }}>
        <Text style={{color:'black'}}>Check Your Internet Connection</Text>
        <TouchableOpacity onPress={()=>{
          if(isConnectedStatus){
            setReLoadingPage(true);
          setWhiteScreenShow(false);
          }
        }}>
          <Text style={{color:'blue',fontSize:20}}>Reload</Text>
        </TouchableOpacity>
      </View>
      {/* Page Content */}
      <ScrollView automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false} style={[styles.container]}>
        <KeyboardAvoidingView>
          <View style={{ display: isShow ? 'none' : 'true' }}>
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
                  <View style={{ flexDirection: 'row', width: '85%', height: 68, marginTop: 30, borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 20, alignItems: 'center', alignSelf: 'center' }}>
                    <TextInput
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                      autoCapitalize={false}
                      placeholder="Email Address"
                      placeholderTextColor="#808080"
                      style={{
                        fontSize: 20,
                        borderColor: 'white',
                        borderWidth: 1,
                        color: 'black',
                        flex: 1,
                        height: 60
                      }}
                    />
                  </View>
                  {touched.email && errors.email && <Text style={styles.fault_red_16}>{errors.email}</Text>}
                  <View style={{ flexDirection: 'row', width: '85%', height: 68, marginTop: 30, borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 20, alignItems: 'center', alignSelf: 'center' }}>
                    <TextInput
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                      autoCapitalize={false}
                      placeholder="Password"
                      secureTextEntry={showPassword}
                      placeholderTextColor="#808080"
                      style={{
                        fontSize: 20,
                        borderColor: 'white',
                        borderWidth: 1,
                        color: 'black',
                        flex: 1,
                        height: 60
                      }}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <MaterialIcons name="remove-red-eye" color={showPassword ? 'black' : 'red'} size={20} />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.fault_red_16}>{errors.password}</Text>
                  )}
                  <TouchableOpacity
                    disabled={!isValid}
                    type="submit"
                    onPress={() => {
                      setIsLoading(true);
                      handlauthUser(values),
                        resetForm({
                          values: {
                            email: '',
                            password: ''
                          }
                        })
                    }}
                    style={[styles.darkBtn, { backgroundColor: isValid ? '#6949FE' : '#A5C9CA', display: isLoading ? 'none' : 'block' }]}>
                    <Text style={styles.headingBtn}>Sign In</Text>
                  </TouchableOpacity>
                  <Text style={{ display: isLoading ? 'block' : 'none', alignSelf: 'center', color: '#32de84', fontSize: 16, marginTop: 10 }}>Loading...</Text>

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
        </KeyboardAvoidingView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', display: isShow ? 'block' : 'none' }}>
          <ActivityIndicator size='large' animating={isShow} />
        </View>
      </ScrollView>
      <View style={{ backgroundColor: isConnectedStatus ? 'green' : 'black', bottom: 0, height: 30, width: '100%', justifyContent: 'center', alignItems: 'center', display: hideNetworkStatusBar }}>
        <Text style={{ color: 'white' }}>{isConnectedStatus && isConnectedStatus ? 'Back Online' : 'No Internet'}</Text>
      </View>
    </>
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
