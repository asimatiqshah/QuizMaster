import axios from 'axios';
import {useState} from 'react';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, 'Name must be at least 6 digits')
    .max(16, 'Too long! it must be at least 16 digits')
    .required('Please Provide Your name'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please Enter Your Email'),
  password: Yup.string()
    .min(8)
    .required('Please Provide Your Password')
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
      '"Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters',
    ),
    confirmPassword: Yup.string()
    .min(8)
    .required('Please Provide Your Password')
    .oneOf([Yup.ref('password')],'Passowrd Not Matched')
});

const SignupForm = ({navigation}) => {
  //Success Message
  const successShowMsg = () => {
    showMessage({
      message: 'Success',
      description: 'Successfully Signup',
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

  //handleSignupApi
  const handleSignup = async formdata => {
    let newObj = {
      name: formdata.name,
      email: formdata.email,
      password: formdata.password,
      gender: radiaVal,
      role: 'user',
    };
    console.log(newObj);
    //Fetching Api
    try {
      let result = await axios.post(
        'https://quiz-node-js.vercel.app/quiz/signup',
        newObj,
      );
      if (result.data.status) {
        successShowMsg();
        setTimeout(() => {
          navigation.navigate('OTPScreen');
        }, 2000);
      }
    } catch (error) {
      errorShowMsg(error.response.data);
      console.log(error.response.data);
      console.log(error);
    }
  };

  //Radio Button Related
  const radioProps = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
  ];
  const [radiaVal, setRadiaVal] = useState('male');
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        resizeMode="stretch"
        source={require('../images/shape.png')}
        style={{
          width: '100%',
          height: 160,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.displayHeading1}>Create Account</Text>
        <Text style={styles.displayParagraph}>
          Join Now and Challenge Your Mind!
        </Text>
      </ImageBackground>
      <Formik
        validationSchema={SignupSchema}
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: '',
        }}>
        {({
          values,
          errors,
          handleChange,
          setFieldTouched,
          isValid,
          touched,
        }) => (
          <View>
            <TextInput
              value={values.name}
              onBlur={()=>setFieldTouched('name')}
              onChangeText={handleChange('name')}
              autoCapitalize={false}
              placeholder="Enter Your Name"
              style={styles.inputStyle}
            />
            {  touched.name && errors.name && <Text style={styles.fault_red_16}>{errors.name}</Text>}
            <TextInput
              value={values.email}
              onBlur={()=>setFieldTouched('email')}
              onChangeText={handleChange('email')}
              autoCapitalize={false}
              placeholder="Email Address"
              style={styles.inputStyle}
            />
            { touched.email && errors.email && <Text style={styles.fault_red_16}>{errors.email}</Text>}
            <TextInput
              value={values.password}
              onBlur={()=>setFieldTouched('password')}
              onChangeText={handleChange('password')}
              autoCapitalize={false}
              placeholder="Password"
              style={styles.inputStyle}
            />
            { touched.password && errors.password && <Text style={styles.fault_red_16}>{errors.password}</Text>}
            <TextInput
              value={values.confirmPassword}
              onBlur={()=>setFieldTouched('confirmPassword')}
              onChangeText={handleChange('confirmPassword')}
              autoCapitalize={false}
              placeholder="Confirm Password"
              style={styles.inputStyle}
            />
            { touched.confirmPassword && errors.confirmPassword && <Text style={styles.fault_red_16}>{errors.confirmPassword}</Text>}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text style={[styles.displayParagraph, {marginBottom: 20}]}>
                Please Select Your Gender
              </Text>
              <RadioForm
                buttonSize={20}
                buttonColor={'white'}
                style={{paddingLeft: 50}}
                labelStyle={{fontSize: 20, color: 'white', paddingRight: 50}}
                radio_props={radioProps}
                formHorizontal={true}
                initial={0}
                onPress={value => {
                  setRadiaVal(value);
                }}
              />
            </View>
            <TouchableOpacity
              disabled={!isValid}
              onPress={() => handleSignup(values)}
              style={[
                styles.darkBtn,
                {backgroundColor: isValid ? '#6949FE' : '#A5C9CA'},
              ]}>
              <Text style={styles.headingBtn}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};
export default SignupForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F1147',
    flex: 1,
  },
  displayHeading1: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'Artegra Soft Bold',
  },
  displayParagraph: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Artegra Soft Bold',
  },
  darkBtn: {
    width: 290,
    height: 63,
    backgroundColor: '#6949FE',
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
  inputStyle: {
    width: '85%',
    fontSize: 20,
    borderRadius: 10,
    alignSelf: 'center',
    paddingLeft: 20,
    marginTop: 35,
    height: 60,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',
  },
  fault_red_16:{
    marginTop:10,
    fontSize:16,
    color:'red',
    paddingLeft:30,
    fontFamily: 'Artegra Soft Bold'
  }
});
