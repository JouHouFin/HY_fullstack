import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button type={props.type} onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterByName, setFilterByName ] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    if (!persons.some(person => person.name === newName)) {
      const newPersons = persons.concat({name: newName, number: newNumber})
      newPersons.sort((a,b) => (a.name > b.name) ? true : false)
      setPersons(newPersons)
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
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
    setFilterByName(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>Filter by name: </div>
      <h2>Add a new number</h2>
      <form>
          <div>Name: <input value={newName} onChange={handleNameChange}/></div>
          <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
          <div><Button handleClick={addContact} text={'add'} type="submit" /></div>          
      </form>
      <h3>Numbers <input value={filterByName} onChange={handleFilterChange} placeholder="filter by name"/></h3>
      <ul>
        {persons.filter(person => person.name.toLowerCase().includes(filterByName.toLowerCase())).map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )

}

export default App