import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [title, setTitle] = useState([]);
  const [isShow,setIsShow] = useState(true);
  useEffect(() => {
    console.log("Working");
    
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let result = await axios.get(
        'https://quiz-node-js.vercel.app/quiz/categoryShow',
      );
      if(result.data.status){
        setIsShow(false);
        setTitle(result.data.data);
      }
      
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const logOutHandler = async ()=>{
    try {
      await AsyncStorage.removeItem('userLogin_token');
      await AsyncStorage.removeItem('isLoggenIn');
      navigation.navigate('LoginForm');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ImageBackground
      source={require('../images/fullimage.jpg')}
      resizeMode="cover"
      style={styles.bg_full}>
      <View style={{ paddingHorizontal: 25, marginBottom: 40, marginTop: 30 }}>
        <Text style={styles.displayHeading1}>Category</Text>
        <Text style={styles.heading2}>Choose a category to start playing</Text>
      </View>
      <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
        {/* Box 1*/}

        {title.map((item, index) => {
          //MAKE CATEGORY CAPITAL CASE AND REMOVE DASH WITH SPACE
          //======================================================
          // 1.Split the string by underscores.
          // 2.Capitalize the first letter of each word.
          // 3.Join the words with spaces.
          const cat = item.category_name.split('_');
          let toUpper = cat.map((word) => word.toUpperCase());
          const mergeCat = toUpper.join(' ');
          return (
            <TouchableOpacity
              key={item._id}
              onPress={() => {
                navigation.navigate('QuestionsScreen', { item });
              }}
              style={{ flexBasis: '50%', alignItems: 'center', paddingTop: 20 }}>
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
                <Text style={styles.smallHeading}>Quiz</Text>
                <Text style={styles.heading2}>{mergeCat}</Text>
              </ImageBackground>
            </TouchableOpacity>
          );
        })}
      </View>
      <View>
        <ActivityIndicator size="large" animating={isShow}   />
      </View>
      <TouchableOpacity
        onPress={logOutHandler}
        style={[styles.darkBtn, { backgroundColor: '#6949FE',marginBottom:20,alignSelf:'center',position:'absolute',bottom:0 }]}>
        <Text style={styles.headingBtn}>Log Out</Text>
      </TouchableOpacity>
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
