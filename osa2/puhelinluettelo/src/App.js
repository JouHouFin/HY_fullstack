import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button type={props.type} onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    if (!persons.some(person => person.name === newName)) {
      setPersons(persons.concat({name: newName}))
      setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }

  }

  const handleContactChange = (event) => {
    console.log("new name: ", event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input value={newName} onChange={handleContactChange}/>
          <Button handleClick={addContact} text={'add'} type="submit" />
        </div>
      </form>
      <h2>Numbers</h2>
      <ol>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
      </ol>
    </div>
  )

}

export default App