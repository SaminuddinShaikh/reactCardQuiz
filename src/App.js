import React, { useState, useEffect, useRef } from 'react';
import FlashCardList from './components/FlashcardList';
import './App.css';
import axios from 'axios';

// const sampleFlashCards = [
//   {
//     id: 1,
//     question: 'what is 2+2?',
//     answer: '4',
//     options: [
//       '2',
//       '3',
//       '4',
//       '5'
//     ]
//   },
//   {
//     id: 2,
//     question: 'Question 2',
//     answer: 'Answer',
//     options: [
//       'Answer',
//       'Answer1',
//       'Answer2',
//       'Answer3'
//     ]
//   }
// ]

function App() {
  const [flashCards, setFlashCards] = useState([]);
  const [catagories, setCatagories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
      .then(res => {
        setCatagories(res.data.trivia_categories);
        console.log(res.data)
      })
  }, []);


  function decodeString(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios.get('https://opentdb.com/api.php', {
      params: {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
      .then(res => {
        setFlashCards(res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [...questionItem.incorrect_answers.map(a => decodeString(a)), answer]
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - 0.5)
          }
        }));
        console.log(res.data);
      })
  }

  return (
    <>
      <form className='header' onSubmit={handleSubmit}>
        <div className="from-group">
          <label htmlFor="category">category</label>
          <select id="category" ref={categoryEl}>
            {catagories.map(category => {
              return (
                <option value={category.id} key={category.id}>{category.name}</option>
              )
            })}
          </select>
        </div>
        <div className="from-group">
          <label htmlFor="amount">Number of Questions</label>
          <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl} />
        </div>
        <div className="from-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashCardList
          flashCards={flashCards}
        />
      </div>
    </>
  );
}

export default App;
