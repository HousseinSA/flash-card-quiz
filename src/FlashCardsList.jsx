import React from "react"
import Cards from "./Cards"

export default function FlashCardsList({ flashCards }) {
  return (
    <div className="cards">
      {flashCards.map((card) => {
        return <Cards key={card.id} card={card} />
      })}
    </div>
  )
}
