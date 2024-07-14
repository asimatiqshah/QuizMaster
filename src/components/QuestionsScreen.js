import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const QuestionsScreen = ({ route }) => {
  const { item } = route.params;
  const [question, setQuestion] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const question_per_page = 1;

  useEffect(() => {
    fetchData();
  }, [])


  const fetchData = async () => {
    try {
      let result = await axios.post('https://quiz-node-js.vercel.app/quiz/category-related-questions', {
        category_id: "668d35180f36ef56242c5d27"
      });
      setQuestion(result.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getCurrentQuestions = () => {
    const startIndex = currentPage * question_per_page;
    const endIndex = startIndex + question_per_page;
    let result = question.slice(startIndex, endIndex);
    console.log(result);
    return result;
  }

  const nextQuestions = () => {
    if ((currentPage + 1) < question.length) {
      const next = currentPage + 1;
      setCurrentPage(next);
    }
  }

  const prevQuestions = ()=>{
    if((currentPage - 1) >= 0){
      const prev = currentPage - 1;
      setCurrentPage(prev);
    }
  }

  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={{ paddingHorizontal: 25, marginBottom: 20, marginTop: 30 }}>
          <Text style={[styles.heading2, { color: '#37E9BB' }]}>0{currentPage+1}/0{question.length}</Text>
          <Text style={styles.heading1}>{item.question}</Text>
        </View>
        <Image
          source={require('../images/tajmahal.jpg')}
          style={{
            width: 304,
            height: 214,
            borderRadius: 10,
            borderWidth: 2,
            alignSelf: 'center',
            borderColor: '#ffff',
          }}
        />
        {/* Bullets */}
        <View
          style={{ justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 20 }}>
          {
            item.options.map((record,index) => {
              return (
                <View key={index} style={{ flexDirection: 'row', paddingVertical: 10 }}>
                  <Image
                    source={require('../images/num_01.png')}
                    style={{ width: 50, height: 50 }}
                  />
                  <Text style={[styles.heading2, { paddingLeft: 20,color:'#37E9BB' }]}>
                    {record}
                  </Text>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }

  return (
    <>
      <ImageBackground
        source={require('../images/fullimage.jpg')}
        resizeMode="cover"
        style={styles.bg_full}>
        {
          <FlatList
            data={getCurrentQuestions()}
            renderItem={renderItem}
          />
        }
        {/* Buttons */}
        <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity disabled={currentPage == 0} onPress={()=>prevQuestions()}  style={{}}>
              <Image source={require('../images/prev.png')} style={{opacity:( currentPage == 0 )?0.2:1}} />
            </TouchableOpacity>
            <TouchableOpacity disabled={(currentPage + 1) >= question.length} onPress={()=>nextQuestions()}>
              <Image source={require('../images/next.png')} style={{opacity: ((currentPage + 1) >= question.length)? 0.2 : 1}} />
            </TouchableOpacity>
          </View>
        </View>

      </ImageBackground>
    </>

  );
};
export default QuestionsScreen;

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
    fontSize: 28,
    color: 'white',
    fontFamily: 'Artegra Soft Light',
  },
  heading2: {
    fontSize: 24,
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
