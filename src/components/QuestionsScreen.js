import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
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
import CheckBox from 'react-native-check-box';
const QuestionsScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [question, setQuestion] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const question_per_page = 1;
  const [userVal, setUserVal] = useState({});
  const [trackReport, setTrackReport] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [second, setSecond] = useState();
  const [minute, setMinute] = useState();
  const [isCheckboxbtn, setIsCheckboxbtn] = useState([false, false, false, false]);
  const intervalRef = useRef(null);
  const startTime = useRef(null);
  const endTime = useRef(null);
  const estimateTime = useRef(null);
  useEffect(() => {
    fetchData();
  }, []);

  //Timer will in useEffect and attacted with useRef Hook to access every where in a component
  useEffect(() => {
    if (isPaused == true) {
      clearInterval(intervalRef.current);
      console.log(trackReport);
      //Getting total time in which question complete
      estimateTimeHandler();
      //Total Score
      let totalResult = {
        trackReport: trackReport,
        total: question.length,
        time: estimateTime.current
      }
      estimateTime.current = 0;
      navigation.navigate('ScoreScreen', { totalResult });
    }
    questionTimer();

  }, [isPaused])


  const estimateTimeHandler = () => {
    const now = new Date().getTime();
    const result = now - startTime.current;
    const finalMinute = Math.floor((result % (1000 * 60 * 60)) / (1000 * 60));
    const finalSecond = Math.floor((result % (1000 * 60)) / 1000);
    estimateTime.current = `${finalMinute <= 9 ? '0' + finalMinute : finalMinute}:${finalSecond <= 9 ? '0' + finalSecond : finalSecond}`;
    console.log(estimateTime + " i am here");
  }

  const fetchData = async () => {
    try {
      let result = await axios.post('https://quiz-node-js.vercel.app/quiz/category-related-questions', {
        category_id: item._id
      });
      setQuestion(result.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCheckBoxVal = (id, answer, marks, indexNumber) => {
    setIsActive(true);
    console.log(id, answer, marks, indexNumber);
    setUserVal({ id, answer, marks });
    const clone = [false, false, false, false];
    clone.splice(indexNumber, 1, true);
    setIsCheckboxbtn([
      ...clone
    ]);

  }

  const getCurrentQuestions = () => {
    const startIndex = currentPage * question_per_page;
    const endIndex = startIndex + question_per_page;
    let result = question.slice(startIndex, endIndex);
    return result;
  }

  const nextQuestions = () => {
    if (isActive) {
      // console.log(userVal,trackReport,isActive);
      //Put Selected Answer in trackReport
      trackReport.push(userVal);
      setTrackReport([
        ...trackReport
      ]);
      setIsActive(false);
      console.log(trackReport);
      //Check Next Page
      if ((currentPage + 1) < question.length) {
        const next = currentPage + 1;
        setCurrentPage(next);
        setIsCheckboxbtn([false, false, false, false]);
      } else if ((currentPage + 1) == question.length) {
        console.log("go");
        clearInterval(intervalRef.current);
        estimateTimeHandler();
        console.log(estimateTime.current);
        //Total Score
        let totalResult = {
          trackReport: trackReport,
          total: question.length,
          time: estimateTime.current
        }
        navigation.navigate('ScoreScreen', { totalResult });
        //make variable clean
        startTime.current = 0;
        endTime.current = 0;
      }
    }

  }

  //Not User Function
  const prevQuestions = () => {
    if ((currentPage - 1) >= 0) {
      const prev = currentPage - 1;
      setCurrentPage(prev);
    }
  }

  const questionTimer = () => {
    startTime.current = new Date().getTime(); //start time
    endTime.current = startTime.current + 60000; //end time

    //suppose 
    //endtime is 2 minutes
    //now is 1 second ====> because interval run after every second so now is updated to one second
    //formula   endTime - now ===> time should be minus in millisecond
    intervalRef.current = setInterval(() => {
      const now = new Date().getTime();
      const result = endTime.current - now;
      if (result <= 0) {
        clearInterval(intervalRef.current);
        console.log("Timesup");
        setIsPaused(true);

      } else {
        //show time in easy format or human readable format
        //we will use formals 
        const second = Math.floor((result % (1000 * 60)) / 1000);
        const minute = Math.floor((result % (1000 * 60 * 60)) / (1000 * 60));
        //put time into states
        setSecond(second);
        setMinute(minute);
      }
    }, 1000)
  }

  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={{ paddingHorizontal: 25, marginBottom: 20, marginTop: 30 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.heading2, { color: '#37E9BB' }]}>0{currentPage + 1}/0{question.length}</Text>
            <Text style={{ fontSize: 16, color: 'red' }}>{minute <= 9 ? '0' + minute : minute}:{second <= 9 ? '0' + second : second}</Text>
          </View>
          <Text style={styles.heading1}>{item.question}</Text>
        </View>
        <Image
 
           source={
          (item.image)
          ?
          {
            uri: `${item.image}`,
          }
          :
          require('../images/ques.jpg')
        }
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
            item.options.map((record, index) => {
              return (
                <View key={index} style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 25, justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require('../images/num_01.png')}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text style={[styles.heading3, { paddingLeft: 10, color: '#37E9BB' }]}>
                    {record}
                  </Text>
                  <CheckBox style={{ paddingLeft: 10 }} checkBoxColor={'white'} isChecked={isCheckboxbtn[index]} onClick={() => handleCheckBoxVal(item._id, item.is_correct[index], item.question_marks, index)} />
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
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity disabled={isActive ? false : true} onPress={() => nextQuestions()}>
              <Image source={require('../images/next.png')} style={{ opacity: isActive ? 1 : 0.2 }} />
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
    fontSize: 30,
    color: 'white',
    fontFamily: 'Artegra Soft Bold',
  },
  smallHeading: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Artegra Soft Light',
  },
  heading1: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Artegra Soft Light',
  },
  heading2: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Artegra Soft Bold',
  },
  heading3: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'Artegra Soft Bold',
  }
  ,
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
