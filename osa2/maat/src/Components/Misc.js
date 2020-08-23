import React from 'react'

export const Button = ({text, value, handleClick}) => {

    return (
      <button value={value} onClick={handleClick}>{text}</button>
    )
}

export const Filter = ({value,handleChange}) => {
    return (
      <form>
        <input value={value} placeholder="Search for a country" onChange={handleChange}></input>
      </form>
    )
}