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
import CheckBox from 'react-native-check-box';
const QuestionsScreen = ({ route,navigation }) => {
  const { item } = route.params;
  const [question, setQuestion] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const question_per_page = 1;
  const [userVal,setUserVal] = useState({});
  const [trackReport,setTrackReport] = useState([]);
  const [isActive,setIsActive] = useState(false);
  const [second,setSecond] = useState();
  const [minute,setMinute] = useState();
  useEffect(() => {
    fetchData();
    questionTimer();
  }, [])


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

  const handleCheckBoxVal = (id,answer,marks)=>{
    setIsActive(true);
    console.log(id,answer,marks);
    setUserVal({id,answer,marks});
  }

  const getCurrentQuestions = () => {
    const startIndex = currentPage * question_per_page;
    const endIndex = startIndex + question_per_page;
    let result = question.slice(startIndex, endIndex);
    return result;
  }

  const nextQuestions = () => {
  if(isActive){
      // console.log(userVal,trackReport,isActive);
      //Put Selected Answer in trackReport
      trackReport.push(userVal);
      setTrackReport([
        ...trackReport
      ]);
      setIsActive(false);
      console.log(currentPage,question.length);
      //Check Next Page
      if ((currentPage + 1) < question.length) {
        const next = currentPage + 1;
        setCurrentPage(next); 
      }else if((currentPage + 1) == question.length){
        console.log("go");
        //Total Score
        let totalResult = {
          trackReport:trackReport,
          total:question.length
        }
        navigation.navigate('ScoreScreen',{totalResult});
      }
  }

  }

  //Not User Function
  const prevQuestions = ()=>{
    if((currentPage - 1) >= 0){
      const prev = currentPage - 1;
      setCurrentPage(prev);
    }
  }

  const questionTimer=()=>{
    const startTime = new Date().getTime();
    const endTime = startTime + 60000;

    //suppose 
    //endtime is 2 minutes
    //now is 1 second ====> because interval run after every second so now is updated to one second
    //formula   endTime - now ===> time should be minus in millisecond
    const countDownInterval = setInterval(()=>{
      const now = new Date().getTime();
      const result = endTime - now;
      if(result <= 0 ){
        clearInterval(countDownInterval);
        console.log("Timesup");
      }else{
        //show time in easy format or human readable format
        //we will use formals 
        const second = Math.floor((result % (1000*60)) / 1000);
        const minute = Math.floor((result%(1000*60*60)) / (1000*60));
  

        //put time in string format
        setSecond(second);
        setMinute(minute);
      }
    },1000)
  }

  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={{ paddingHorizontal: 25, marginBottom: 20, marginTop: 30 }}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={[styles.heading2, { color: '#37E9BB' }]}>0{currentPage+1}/0{question.length}</Text>
          <Text style={{fontSize:16,color:'red'}}>{minute <= 9 ? '0'+minute:minute}:{second <= 9 ? '0'+second:second}</Text>
          </View>
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
                  </Text><CheckBox onClick={()=>handleCheckBoxVal(item._id,item.is_correct[index],item.question_marks)} />
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
            <TouchableOpacity disabled={isActive?false:true} onPress={()=>nextQuestions()}>
              <Image source={require('../images/next.png')} style={{opacity: isActive? 1 : 0.2}} />
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
