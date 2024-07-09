import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const HomeScreen = ({navigation}) => {
  const [title, setTitle] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let result = await axios.get(
      'http://192.168.10.28:8080/quiz/categoryShow',
    );
    setTitle(result.data.data);
    console.log(result.data);
    console.log('working');
  };

  return (
    <ImageBackground
      source={require('../images/fullimage.jpg')}
      resizeMode="cover"
      style={styles.bg_full}>
      <View style={{paddingHorizontal: 25, marginBottom: 40, marginTop: 30}}>
        <Text style={styles.displayHeading1}>Category</Text>
        <Text style={styles.heading2}>Choose a category to start playing</Text>
      </View>
      <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}>
        {/* Box 1*/}

        {title.map((item, index) => {
          return (
            <TouchableOpacity
            key={item._id}
            onPress={()=>{
              navigation.navigate('QuestionsScreen',{item});
            }}
              style={{flexBasis: '50%', alignItems: 'center', paddingTop: 20}}>
              <ImageBackground
                source={require('../images/knowladge.png')}
                resizeMode="contain"
                style={{
                  width: 156,
                  height: 152,
                  paddingHorizontal: 10,
                  paddingTop: 10,
                }}>
                <Image
                  source={require('../images/world.jpg')}
                  style={{
                    width: 80,
                    height: 51,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: '#fff',
                    alignSelf: 'flex-end',
                  }}
                />
                {/* <Text style={styles.smallHeading}>Quiz</Text>
                <Text style={styles.heading2}>{item.category}</Text> */}
              </ImageBackground>
            </TouchableOpacity>
          );
        })}
      </View>
    </ImageBackground>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  bg_full: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  displayHeading1: {
    fontSize: 40,
    color: 'white',
    fontFamily: 'Artegra Soft Bold',
  },
  smallHeading: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Artegra Soft Light',
  },
  heading1: {
    fontSize: 26,
    color: 'white',
    fontFamily: 'Artegra Soft Light',
  },
  heading2: {
    fontSize: 20,
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
    marginTop: 40,
  },
  headingBtn: {
    fontSize: 26,
    color: 'white',
    fontFamily: 'Artegra Soft Bold',
  },
  borderBtn: {
    width: 295,
    height: 68,
    borderColor: '#6949FE',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  borderText: {
    fontSize: 26,
    color: 'white',
    fontFamily: 'Artegra Soft Bold',
  },
});
