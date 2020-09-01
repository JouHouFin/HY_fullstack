import React from 'react'

const Button = (props) => {
  return (
    <button type={props.type} onClick={props.handleClick}>{props.text}</button>
  )
}

const FilterInput = ({filteredString, handleFilterChange}) => {
  return (
    <input value={filteredString} onChange={handleFilterChange} placeholder="filter by name"/>
  )
}

export default {Button: Button, FilterInput: FilterInput}