import {useState} from 'react';
import {Button, Text, View,Alert,} from 'react-native';

const Test = () => {
  const initialdata = [
    {
      id: 1,
      question: 'What is Pakistan?',
      options: [
        'A. A country in South Asia',
        'B. A city in India',
        'C. A river in Africa',
        'D. A mountain in Europe',
      ],
    },
    {
      id: 2,
      question: 'What is the capital of France?',
      options: ['A. Berlin', 'B. Madrid', 'C. Paris', 'D. Rome'],
    },
    {
      id: 3,
      question: 'Which planet is known as the Red Planet?',
      options: ['A. Earth', 'B. Mars', 'C. Jupiter', 'D. Saturn'],
    },
    {
      id: 4,
      question: "Who wrote 'Romeo and Juliet'?",
      options: [
        'A. Mark Twain',
        'B. J.K. Rowling',
        'C. William Shakespeare',
        'D. Charles Dickens',
      ],
    },
    {
      id: 5,
      question: 'What is the largest ocean on Earth?',
      options: [
        'A. Atlantic Ocean',
        'B. Indian Ocean',
        'C. Arctic Ocean',
        'D. Pacific Ocean',
      ],
    },
    {
      id: 6,
      question: 'What is the smallest prime number?',
      options: ['A. 0', 'B. 1', 'C. 2', 'D. 3'],
    },
    {
      id: 7,
      question: 'Who was the first President of the United States?',
      options: [
        'A. Thomas Jefferson',
        'B. Abraham Lincoln',
        'C. George Washington',
        'D. John Adams',
      ],
    },
    {
      id: 8,
      question: 'What is the chemical symbol for gold?',
      options: ['A. Au', 'B. Ag', 'C. Gd', 'D. Go'],
    },
    {
      id: 9,
      question: 'Which language is primarily spoken in Brazil?',
      options: ['A. Spanish', 'B. English', 'C. Portuguese', 'D. French'],
    },
    {
      id: 10,
      question: 'What is the longest river in the world?',
      options: [
        'A. Amazon River',
        'B. Nile River',
        'C. Yangtze River',
        'D. Mississippi River',
      ],
    },
    {
      id: 11,
      question: 'In which year did the Titanic sink?',
      options: ['A. 1912', 'B. 1905', 'C. 1920', 'D. 1898'],
    },
    {
      id: 12,
      question: 'What is the currency of Japan?',
      options: ['A. Yen', 'B. Won', 'C. Yuan', 'D. Peso'],
    },
    {
      id: 13,
      question: 'What is the square root of 64?',
      options: ['A. 6', 'B. 7', 'C. 8', 'D. 9'],
    },
    {
      id: 14,
      question: 'Who painted the Mona Lisa?',
      options: [
        'A. Vincent van Gogh',
        'B. Pablo Picasso',
        'C. Leonardo da Vinci',
        'D. Claude Monet',
      ],
    },
    {
      id: 15,
      question: 'Which element has the atomic number 1?',
      options: ['A. Helium', 'B. Hydrogen', 'C. Oxygen', 'D. Carbon'],
    },
    {
      id: 16,
      question: 'What is the capital of Australia?',
      options: ['A. Sydney', 'B. Melbourne', 'C. Canberra', 'D. Perth'],
    },
    {
      id: 17,
      question: 'Who discovered penicillin?',
      options: [
        'A. Marie Curie',
        'B. Albert Einstein',
        'C. Alexander Fleming',
        'D. Isaac Newton',
      ],
    },
    {
      id: 18,
      question: 'Which planet is closest to the sun?',
      options: ['A. Venus', 'B. Earth', 'C. Mercury', 'D. Mars'],
    },
    {
      id: 19,
      question: 'What is the largest mammal?',
      options: [
        'A. Elephant',
        'B. Blue Whale',
        'C. Giraffe',
        'D. Great White Shark',
      ],
    },
    {
      id: 20,
      question: "Who wrote '1984'?",
      options: [
        'A. Aldous Huxley',
        'B. George Orwell',
        'C. J.R.R. Tolkien',
        'D. F. Scott Fitzgerald',
      ],
    },
  ];
  const [question, setQuestion] = useState(initialdata);

  //variable
  const [currentPage,setCurrentPage] = useState(0);
  const question_per_page = 4;

  const nextQuestions = ()=>{
    const next = currentPage + 1;
    const ques = next * question_per_page; 
  }

  const getCurrentQuestions=()=>{
    const startIndex = currentPage * question_per_page;
    const endIndex = startIndex + question_per_page;
    let result = question.slice(startIndex,endIndex);
    console.log(result);
  }
  return (
    <View>
      <Text>123</Text>
      <Button title='press me' onPress={getCurrentQuestions}></Button>
      <Button
        title="Press me"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
    </View>
  );
};
export default Test;
