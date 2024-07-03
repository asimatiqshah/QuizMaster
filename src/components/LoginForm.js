import axios from 'axios';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {useRef, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
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
    .required('Please Provide Your Password')
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
      '"Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
    ),
});

const LoginForm = ({navigation}) => {
const [formError,setFormError] = useState('');

  const handlauthUser = async (formdata) => {

    let {email,password} = formdata; 
    try {
      console.log(email,password);
      let result = await axios.post('http://192.168.10.52:8080/quiz/login', {
        email: email,
        password: password,
      });
      if (result.data.status) {
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
          style={{width: 198, height: 176}}
        />
      </ImageBackground>
      <View
        style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.displayHeading1}>Sign in to continue</Text>
      </View>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SigninSchema}
        onSubmit={(values)=>Alert.alert(JSON.stringify(values))}
        >
        {({
          values,
          errors,
          handleChange,
          setFieldTouched,
          isValid,
          touched,
          handleSubmit,
        }) => (
          <View>
            <TextInput
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              autoCapitalize={false}
              placeholder="Email Address"
              style={{
                width: '85%',
                fontSize: 20,
                borderRadius: 10,
                alignSelf: 'center',
                paddingLeft: 20,
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
              style={{
                width: '85%',
                fontSize: 20,
                borderRadius: 10,
                alignSelf: 'center',
                paddingLeft: 20,
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
              onPress={()=>handlauthUser(values)}
              style={[styles.darkBtn,{backgroundColor:isValid ? '#6949FE':'#A5C9CA'}]}>
              <Text style={styles.headingBtn}>Sign In</Text>
            </TouchableOpacity>
            <Text style={styles.fault_red}>{formError}</Text>
          </View>
        )}
      </Formik>
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
  fault_red:{
    marginTop:20,
    fontSize:20,
    color:'red',
    alignSelf:'center',
    fontFamily: 'Artegra Soft Bold'
  },
  fault_red_16:{
    marginTop:10,
    fontSize:16,
    color:'red',
    paddingLeft:30,
    fontFamily: 'Artegra Soft Bold'
  }
});
