import { Text, View } from "react-native";

const ScoreScreen=({route})=>{
    const {totalResult} = route.params;
    const findCorrectAnswer = totalResult.trackReport.reduce((total,current)=>{
        if(current['answer'] == true) total = total + 1;
        return total;
    },0);

    //Total marks
    let count = 0;
    const findMarks = totalResult.trackReport.reduce((total,current,index,arrray)=>{
        if(current['answer'] == true){
            count = total + Number(current['marks']);
        }
        if(index > arrray.length){
            total['count'] = count;
        }

        return total;
    },{});
    console.log(findMarks);
    return(
        <View>
            <Text>Congrats</Text>
            <Text>You attempted questions:{totalResult.total}/{totalResult.trackReport.length}</Text>
            <Text>Correct Answer:{findCorrectAnswer}</Text>
            <Text>Score secured:1</Text>
            <Text>Time Spent:</Text>
        </View>
    )
}
export default ScoreScreen;