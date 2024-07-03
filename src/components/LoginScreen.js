import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="stretch"
        source={require('../images/shape.png')}
        style={{
          width: '100%',
          height: 379,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../images/Quizzless.png')}
          style={{width: 198, height: 176}}
        />
      </ImageBackground>
      <View style={{marginTop:20,justifyContent:'center',alignItems:'center'}}>
        <Text style={styles.displayHeading1}>Let's Play!</Text>
        <Text style={styles.heading1}>Play now and Level up</Text>
      </View>
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity onPress={()=> navigation.navigate('LoginForm')} style={styles.darkBtn}>
          <Text style={styles.headingBtn}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('SignupForm')} style={styles.borderBtn}>
          <Text style={styles.borderText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F1147',
    flex: 1,
  },
  displayHeading1: {
    fontSize: 40,
    color: 'white',
    fontFamily:'Artegra Soft Bold'
  },
  heading1: {
    fontSize: 26,
    color: 'white',
    fontFamily:"Artegra Soft Light"
  },
  darkBtn:{
    width:295,
    height:68,
    backgroundColor:'#6949FE',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:40
  },
  headingBtn: {
    fontSize: 26,
    color: 'white',
    fontFamily:"Artegra Soft Bold"
  },
  borderBtn:{
    width:295,
    height:68,
    borderColor: '#6949FE',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:20
  },
  borderText: {
    fontSize: 26,
    color: 'white',
    fontFamily:"Artegra Soft Bold"
  }
});