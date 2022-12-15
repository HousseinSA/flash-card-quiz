import axios from "axios"
import React, { useState, useEffect } from "react"
import FlashCardsList from "./FlashCardsList"
import Header from "./Header"
export default function App() {
  // category state
  const [flashCategories, setFlashCategoires] = useState([])
  // flash card states variables
  const [flashCards, setFlashCards] = useState([])
  // useEffect for the category api
  useEffect(() => {
    axios("https://opentdb.com/api_category.php").then((res) => {
      setFlashCategoires(
        res.data.trivia_categories.map((category) => {
          return category
        })
      )
    })
  })
  // handeling the sumbit with the header section and fetching the flashcard api
  function handelSumbit(e, category, amount) {
    e.preventDefault()
    axios("https://opentdb.com/api.php", {
      params: {
        category: category.current.value,
        amount: amount.current.value,
      },
    }).then((res) => {
      setFlashCards(
        res.data.results.map((card, index) => {
          const options = [
            ...card.incorrect_answers.map((option) => decodeString(option)),
          ]
          // returning the card from the results array
          return {
            id: index,
            question: decodeString(card.question),
            options: options,
            answer: decodeString(card.correct_answer),
          }
        })
      )
    })
  }
  // decoding string function for the codede html string
  function decodeString(e) {
    const text = document.createElement("textarea")
    text.innerHTML = e
    return text.value
  }

  return (
    <div className="container">
      <Header flashCategories={flashCategories} handelSumbit={handelSumbit} />
      <FlashCardsList flashCards={flashCards} />
    </div>
  )
}
