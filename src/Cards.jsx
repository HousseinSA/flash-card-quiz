import React, { useEffect, useRef, useState } from "react"
export default function Cards({ card }) {
  // click state var and and height value
  const [click, setClick] = useState(false)
  const [cardHeight, setCardHeight] = useState()
  // back and front of card ref var
  const frontEl = useRef()
  const backEl = useRef()
  // maxheight function to update the height of card
  function cardmaxHeight() {
    // getting current value of useRef var of front and back elements
    const frontHeight = frontEl.current.clientHeight
    const backHeight = backEl.current.clientHeight
    return setCardHeight(Math.max(frontHeight, backHeight, 100))
  }
  // useEffect fun when any of card element change so the fun resize it.
  useEffect(cardmaxHeight, [card.answer, card.question, card.options])
  // useEffect for window eventListner to Change it card when the window resize.
  useEffect(() => {
    window.addEventListener("resize", cardmaxHeight())
    return window.removeEventListener("resize", cardmaxHeight())
  })
  return (
    <div
      style={{ height: cardHeight }}
      className={` card ${click ? "flip" : ""} `}
      onClick={() => setClick(!click)}
    >
      <div className="front" ref={frontEl}>
        <p>{card.question}</p>
        <ol>
          {card.options.map((option) => {
            return <li key={option}>{option}</li>
          })}
        </ol>
      </div>
      <div className="back" ref={backEl}>
        <p>{card.answer}</p>
      </div>
    </div>
  )
}
