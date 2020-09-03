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

const Notification = ({ message }) => {
  if (message.msg === null) {
    return null
  }

  let msgStyle = null

  if (message.type === 'error') {
    msgStyle = {padding: '4px', border: '1px solid black', backgroundColor: 'red',display:'inline-block'}
  }
  if (message.type === 'success') {
    msgStyle = {padding: '4px', border: '1px solid black', backgroundColor: 'green',display:'inline-block'}
  }

  return (
    <div className="error" style={msgStyle}>
      {message.msg}
    </div>
  )
}

export default {Button, FilterInput, PersonForm, Notification}