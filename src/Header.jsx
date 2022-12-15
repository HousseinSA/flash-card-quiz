import React, { useRef } from "react"

export default function Header({ flashCategories, handelSumbit }) {
  // useRef var for option and amount element and get there values for the submit function
  const optionEl = useRef()
  const amountEl = useRef()
  return (
    <form
      className="header"
      onSubmit={(e) => handelSumbit(e, optionEl, amountEl)}
    >
      <div className="category">
        <label htmlFor="category">enter category</label>
  {/* mapping the category array to the select tag and make value the id */}
        <select ref={optionEl}>

          {flashCategories.map((cat) => {
            return (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            )
          })}
        </select>
      </div>
      <div className="amount">
        <label htmlFor="amount"> enter question amount</label>
        <div className="child">
          <input
            type="number"
            defaultValue={10}
            min="1"
            step={1}
            ref={amountEl}
          />
          <button>Generate</button>
        </div>
      </div>
    </form>
  )
}
