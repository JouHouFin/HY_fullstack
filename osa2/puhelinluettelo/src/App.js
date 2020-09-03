import React, { useState, useEffect } from 'react'
import utils from './components/utils'
import personComms from './services/communications'
import personComps from './components/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteringString, setFilteringString] = useState('')

  const makePerson = () => { return { name: newName, number: newNumber } }  // helper function
  const resetFields = () => { setNewName(''); setNewNumber('') }          // helper function
  const handleNameChange = event => { setNewName(event.target.value) }
  const handleNumberChange = event => { setNewNumber(event.target.value) }
  const handleFilterChange = event => { setFilteringString(event.target.value) }

  useEffect(() => {
    personComms.getPersons()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addContact = event => {
    event.preventDefault()
    if (newName === '') {
      alert(`Name cannot be empty`)

    } else if (newNumber === '') {
      alert(`Number cannot be empty`)

    } else if (persons.some(person => person.name === newName)) {
      const personToModifyId = persons.find(person => person.name === newName).id
      const result = window.confirm(`${newName} is already added to phonebook. Change the number?`)

      if (result) {
      const modifiedPersonObject = makePerson()
      personComms.updatePerson(personToModifyId, modifiedPersonObject)
      .then(modifiedPerson => {
        setPersons(persons.map(person => person.id !== personToModifyId ? person : modifiedPerson))
        resetFields()
      })
      }

    } else {
      const newPersonObject = makePerson()
      personComms.createPerson(newPersonObject)
      .then(initialNewPerson => {
        setPersons(persons.concat(initialNewPerson))
        resetFields()
      })

    }
  }

  const deleteContact = (personId, personName) => {
    const result = window.confirm(`Delete ${personName} from phonebook?`);
    if (result) {
      personComms.deletePerson(personId)
      .then(() => {
        setPersons(persons.filter(person => personId !== person.id))
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add a new number</h2>
      <utils.PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addContact={addContact} />
      <h3>Numbers <utils.FilterInput filteringString={filteringString} handleFilterChange={handleFilterChange} /></h3>
      <personComps.PersonList persons={persons} filteringString={filteringString} deleteContact={deleteContact}/>
    </div>
  )

}

export default App