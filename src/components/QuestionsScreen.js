import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Button,
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
  },[])


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

  const nextQuestions=()=>{
    if((currentPage + 1) < question.length){
      const next = currentPage + 1;
      setCurrentPage(next);
    }
  }

  return (
    <View>
      {
        question && getCurrentQuestions().map((record, index) => {
          return (
              <View key={index}>
                <Text>{record.question}</Text>
              </View>
          )
        })
      }
      <Button title='Next' onPress={()=>nextQuestions()} />
    </View>
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
