import axios from 'axios';
import {useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const LoginForm = ({navigation}) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handlauthUser = async () => {
    try {
      let result = await axios.post('http://192.168.10.52:8080/quiz/login', {
        email: form.email,
        password: form.password,
      });
      if(result.data.status){
        navigation.navigate('HomeScreen')
      }
    } catch (error) {
      console.log(error.response.data)
      //Reference for handling error in async await : https://rapidapi.com/guides/handle-axios-errors
    }
  };

  return (
    <View style={styles.container}>
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
      <View>
        <TextInput
          onChangeText={val => setForm({...form, email: val})}
          value={form.email}
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
        <TextInput
          onChangeText={val => setForm({...form, password: val})}
          value={form.password}
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
        <TouchableOpacity onPress={handlauthUser} style={styles.darkBtn}>
          <Text style={styles.headingBtn}>Sign In</Text>
        </TouchableOpacity>
        <Text>{form.password}</Text>
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
});
