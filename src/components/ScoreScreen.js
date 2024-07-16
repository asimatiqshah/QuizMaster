import { ImageBackground, StyleSheet, Text, View } from "react-native";

const ScoreScreen = ({ route }) => {
    const { totalResult } = route.params;
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
    return (
        <ImageBackground source={require('../images/fullimage.jpg')} style={styles.bg_full}>
            <ImageBackground source={(findCorrectAnswer>=3) ? require(`../images/winner_doodles.png`):require(`../images/fail.png`)} style={{width:212,height:234,justifyContent:'center',alignItems:'center',marginTop:50}}>
                <Text style={styles.displayHeading1}>{findSecuredMarks}</Text>
                <Text style={styles.smallHeading}>Score Secured</Text>
                <Text style={styles.smallHeading}>Out Of {findTotalMarks}</Text>
            </ImageBackground>
            <Text style={styles.heading2}>Congrats</Text>
            <Text style={styles.smallHeading}>You attempted questions: <Text style={{color:'#37E9BB'}}>{totalResult.total}</Text> / {totalResult.trackReport.length}</Text>
            <Text style={styles.smallHeading}>Correct Answer: <Text style={{color:'#37E9BB'}} >{findCorrectAnswer}</Text></Text>
        
            <Text style={styles.smallHeading}>Time Spent:</Text>
        </ImageBackground>
    )
}
export default ScoreScreen;

const styles = StyleSheet.create({
    bg_full:{
        flex:1,
        alignItems:'center'
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
      }
})