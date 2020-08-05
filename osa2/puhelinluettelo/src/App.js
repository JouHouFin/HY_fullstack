import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Button = (props) => {
  return (
    <button type={props.type} onClick={props.handleClick}>{props.text}</button>
  )
}

const PersonForm = ({newName, handleNameChange, newNumber, handleNumberChange, addContact}) => {
  return (
    <form>
      <div>Name: <input value={newName} onChange={handleNameChange}/></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
      <div><Button handleClick={addContact} text={'add'} type="submit" /></div>          
    </form>  
  )
}

const FilterByName = ({filteredString, handleFilterChange}) => {
  return (
    <input value={filteredString} onChange={handleFilterChange} placeholder="filter by name"/>
  )
}

const Person = ({person}) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const PersonList = ({persons, filteringString}) => {
  const filteredList = persons.filter(person => person.name.toLowerCase().includes(filteringString.toLowerCase()))
  filteredList.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? true : false)

  return (
    <ul>
      {filteredList.map(person => <Person key={person.name} person={person}/>)}
    </ul>  
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteringString, setFilteringString ] = useState('')

  const hook = () => {
    console.log("effect")
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log("promise fulfilled")
      setPersons(response.data)
    })
  }

  useEffect(hook, [])
  console.log("persons length: ", persons.length)
  const addContact = (event) => {
    event.preventDefault()
    if (newName === '') {
      alert(`Name cannot be empty`)
    } else if (newNumber === '') {
      alert(`Number cannot be empty`)
    } else if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log("new name: ", event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log("new number: ", event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log("filtering by name: ", event.target.value)
    setFilteringString(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add a new number</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addContact={addContact}/>
      <h3>Numbers <FilterByName filteringString={filteringString} handleFilterChange={handleFilterChange}/></h3>
      <PersonList persons={persons} filteringString={filteringString}/>
    </div>
  )

}

export default App