import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ScoreScreen = ({ route, navigation }) => {
    //const [userID,setuserID] = useState();
    const [count,setCount] = useState(0);
    const [isActive,setIsActive] = useState(false);
    const [userID,setUserID] = useState(null);
    const { totalResult } = route.params;

    //Run getDataFromStorage
    useEffect(() =>{
        getDataFromStorage();
    });

    useEffect(()=>{
        setCount(0);
    },[totalResult])

    //Run saveRecordsInDatabase
    // useEffect( ()=>{
    //     console.log(count + "i am running");
    //     if(userID && count == 0){
    //         saveRecordsInDatabase();
    //         setCount(count + 1);
    //     }
    // },[isActive])

    //Get Data From Async Storage
    const getDataFromStorage = async () => {
        try {
            const token = await AsyncStorage.getItem('userLogin_token');
            // console.log(token);
            let newObj={
                email:JSON.parse(token)
            }
            if (token) {
                let result = await axios.post(
                    'https://quiz-node-js.vercel.app/quiz/userIndividualDetail',
                    newObj,
                );
                if(result.data.status){
                    let { _id } = result.data.data;
                    setUserID(_id);
                    if(count == 0){
                        saveRecordsInDatabase(_id);
                    }
                }
            }
        } catch (error) {
            console.log(error + " IN ScoreScreen");
        }
    }

    //Correct Answer
    const findCorrectAnswer = totalResult.trackReport.reduce((total, current) => {
        if (current['answer'] == true) total = total + 1;
        return total;
    }, 0);

    //Total marks
    const findTotalMarks = totalResult.trackReport.reduce((total, current) => {
        total = total + Number(current['marks']);
        return total;
    }, 0);

    //Secured Marks
    const findSecuredMarks = totalResult.trackReport.reduce((total, current) => {
        if (current['answer'] == true) {
            total = total + Number(current['marks']);
        }
        return total;
    }, 0);

    //Save Data In Database
    const saveRecordsInDatabase = async (_id) => {
        let newObj = {
            user_id:userID,
            category_id: totalResult.category_id,
            attempted_questions : totalResult.trackReport.length.toString(),
            score_secured : findSecuredMarks.toString(),
            time_spend : totalResult.time.toString(),
            status : findCorrectAnswer >= 3 ? 'Passed':'Failed'
        }
       try {
        if(newObj.user_id !== '' && newObj.attempted_questions !== '' && newObj.score_secured !== '' && newObj.time_spend !== '' && newObj.status !== '' ){
            let result = await axios.post('https://quiz-node-js.vercel.app/quiz/progressRecords',newObj);
            setCount(count + 1);
        }
       } catch (error) {
        console.log(error)
       }
    }

    return (
        <ImageBackground source={require('../images/fullimage.jpg')} style={styles.bg_full}>
            <ImageBackground source={(findCorrectAnswer >= 3) ? require(`../images/winner_doodles.png`) : require(`../images/fail.png`)} style={{ width: 212, height: 234, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                <Text style={styles.displayHeading1}>{findSecuredMarks}</Text>
                <Text style={styles.smallHeading}>Score Secured</Text>
                <Text style={styles.smallHeading}>Out Of {findTotalMarks}</Text>
            </ImageBackground>
            <Text style={styles.heading2}>{findCorrectAnswer >= 3 ? 'Congrats' : <Text style={{ color: '#FF0000' }}>Failed</Text>}</Text>
            <Text style={styles.smallHeading}>You attempted questions: <Text>{totalResult.total}</Text> / <Text style={{ color: '#37E9BB' }}>{totalResult.trackReport.length}</Text></Text>
            <Text style={styles.smallHeading}>Correct Answer: <Text style={{ color: '#37E9BB' }} >{findCorrectAnswer}</Text></Text>

            <Text style={styles.smallHeading}>Time Spent :<Text style={{ color: '#37E9BB' }} > {totalResult.time}</Text></Text>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('AppContainer');
                }}
                style={[styles.darkBtn, { backgroundColor: '#6949FE' }]}>
                <Text style={styles.headingBtn}>Go To Menu</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}
export default ScoreScreen;

const styles = StyleSheet.create({
    bg_full: {
        flex: 1,
        alignItems: 'center'
    },
    displayHeading1: {
        fontSize: 60,
        color: 'white',
        fontFamily: 'Artegra Soft Bold'
    },
    heading2: {
        fontSize: 30,
        color: '#37E9BB',
        fontFamily: 'Artegra Soft Bold',
    },
    smallHeading: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Artegra Soft Light',
    },
    darkBtn: {
        width: 275,
        height: 58,
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
    }
})