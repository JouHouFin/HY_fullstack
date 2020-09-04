import React, { useState, useEffect } from 'react'
import utils from './components/utils'
import personComms from './services/communications'
import personComps from './components/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteringString, setFilteringString] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({msg: null, type: null})

  const makePerson = () => { return { name: newName, number: newNumber } }
  const resetFields = () => { setNewName(''); setNewNumber('') } 
  const handleNameChange = event => { setNewName(event.target.value) }
  const handleNumberChange = event => { setNewNumber(event.target.value) }
  const handleFilterChange = event => { setFilteringString(event.target.value) }
  const setNotificationMessageDelay = () => {
    setTimeout(() => {          
      setNotificationMessage({msg: null, type: null})}, 5000)
  }

  useEffect(() => {
    personComms.getPersons()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addContact = event => {
    event.preventDefault()
    if (newName === '') {
      setNotificationMessage({msg: 'Name cannot be empty.', type: 'error'})
      setNotificationMessageDelay()

    } else if (newNumber === '') {
      setNotificationMessage({msg: 'Number cannot be empty.', type: 'error'})
      setNotificationMessageDelay()

    } else if (persons.some(person => person.name === newName)) {
      const personToModifyId = persons.find(person => person.name === newName).id
      const result = window.confirm(`${newName} is already added to phonebook. Change the number?`)

      if (result) {
      const modifiedPersonObject = makePerson()
      personComms.updatePerson(personToModifyId, modifiedPersonObject)
      .then(modifiedPerson => {
        setPersons(persons.map(person => person.id !== personToModifyId ? person : modifiedPerson))
        resetFields()
        setNotificationMessage({msg: `${newName} modified.`, type: 'success'})
        setNotificationMessageDelay()
      })
      .catch(error => {
        setNotificationMessage({msg: `The contact was already deleted from the server. Refreshing the contact list.`, type: 'error'})
        personComms.getPersons()
        .then(initialPersons => {
          setPersons(initialPersons)
        })        
        setNotificationMessageDelay()
      })
      }

    } else {
      const newPersonObject = makePerson()
      personComms.createPerson(newPersonObject)
      .then(initialNewPerson => {
        setPersons(persons.concat(initialNewPerson))
        resetFields()
        setNotificationMessage({msg: `${newName} added.`, type: 'success'})
        setNotificationMessageDelay()
      })

    }
  }

  const deleteContact = (personId, personName) => {
    const result = window.confirm(`Delete ${personName} from phonebook?`);
    if (result) {
      personComms.deletePerson(personId)
      .then(() => {
        setPersons(persons.filter(person => personId !== person.id))
        setNotificationMessage({msg: `${personName} deleted.`, type: 'success'})
        setNotificationMessageDelay()
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add a new number</h2>
      <utils.PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addContact={addContact} />
      <utils.Notification message={notificationMessage} />
      <h3>Numbers <utils.FilterInput filteringString={filteringString} handleFilterChange={handleFilterChange} /></h3>
      <personComps.PersonList persons={persons} filteringString={filteringString} deleteContact={deleteContact}/>
    </div>
  )

}

export default App