import React from 'react'

const Button = props => {
  return (
    <button type={props.type} onClick={props.handleClick}>{props.text}</button>
  )
}

const FilterInput = ({filteredString, handleFilterChange}) => {
  return (
    <input value={filteredString} onChange={handleFilterChange} placeholder="filter by name"/>
  )
}

const PersonForm = ({ newName, handleNameChange, newNumber, handleNumberChange, addContact }) => {
  return (
    <form>
      <div>Name: <input value={newName} onChange={handleNameChange} /></div>
      <div>Number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div><Button handleClick={addContact} text={'add'} type="submit" /></div>
    </form>
  )
}

export default {Button, FilterInput, PersonForm}