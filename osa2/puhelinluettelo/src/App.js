import React, { useState, useEffect } from 'react'
import personUtils from './components/communications'
import utils from './components/utils'

const PersonForm = ({ newName, handleNameChange, newNumber, handleNumberChange, addContact }) => {
  return (
    <form>
      <div>Name: <input value={newName} onChange={handleNameChange} /></div>
      <div>Number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div><utils.Button handleClick={addContact} text={'add'} type="submit" value={null}/></div>
    </form>
  )
}

const Person = ({ person, deleteContact }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>{person.id}</td>
      <td><utils.Button handleClick={deleteContact} type={"submit"} text={"delete"} value={person.id} /></td>
    </tr>
  )
}

const PersonList = ({ persons, filteringString, deleteContact }) => {
  const filteredList = persons.filter(person => person.name.toLowerCase().includes(filteringString.toLowerCase()))
  filteredList.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? true : false)

  return (
    <table>
      <tbody>
        {filteredList.map(person => <Person key={person.name} person={person} deleteContact={deleteContact}/>)}
      </tbody>
    </table>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteringString, setFilteringString] = useState('')

  useEffect(() => {
    console.log("starting to fetch initial persons")
    personUtils.getPersons()
      .then(initialPersons => {
        console.log("promise fulfilled, initial persons fetched")
        setPersons(initialPersons)
      })
  }, [])
  console.log(`persons length: ${persons.length}`)

  const addContact = event => {
    event.preventDefault()
    if (newName === '') {
      alert(`Name cannot be empty`)
    } else if (newNumber === '') {
      alert(`Number cannot be empty`)
    } else if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber
      }

      personUtils.createPerson(newPersonObject)
        .then(initialNewPerson => {
          setPersons(persons.concat(initialNewPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deleteContact = event => {
    event.preventDefault()
    const personId = event.target.value
    personUtils.deletePerson(personId)
      .then(response => {
        setPersons(persons.filter(person => person.id !== personId))
        setNewName('a')
        setNewNumber('b')
      })
    
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
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addContact={addContact} />
      <h3>Numbers <utils.FilterInput filteringString={filteringString} handleFilterChange={handleFilterChange} /></h3>
      <PersonList persons={persons} filteringString={filteringString} deleteContact={deleteContact}/>
    </div>
  )

}

export default App