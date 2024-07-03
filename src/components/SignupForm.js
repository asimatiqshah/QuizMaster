import { useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


const SignupForm = () => {

    const radioProps = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
      ];
    
    const [value, setValue] = useState(0);
  return (
    <View style={styles.container}>
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
      <View>
        <TextInput placeholder="Enter Your Name" style={styles.inputStyle} />
        <TextInput placeholder="Email Address" style={styles.inputStyle} />
        <TextInput placeholder="Password" style={styles.inputStyle} />
        <TextInput placeholder="Confirm Password" style={styles.inputStyle} />
        <View style={{justifyContent:'center',alignItems:'center',marginTop:20}}>
            <Text style={[styles.displayParagraph,{marginBottom:20}]} >Please Select Your Gender</Text>
        <RadioForm
        buttonSize={20}
        buttonColor={'white'}
        style={{paddingLeft:50}}
        labelStyle={{fontSize: 20, color: 'white',paddingRight:50}}

          radio_props={radioProps}
          formHorizontal={true}
          initial={0}
          onPress={value => {
            setValue(value);
          }}
        />
        </View>
        <TouchableOpacity style={styles.darkBtn}>
          <Text style={styles.headingBtn}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
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
});
