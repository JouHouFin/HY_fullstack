import React from 'react';
import utils from './utils'

const Person = ({ person, deleteContact }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><utils.Button handleClick={() => deleteContact(person.id, person.name)} type={"submit"} text={"delete"} /></td>
    </tr>
  )
}

const PersonList = ({ persons, filteringString, deleteContact }) => {
  if (persons.length === 0) {
    return ( <h4>No numbers yet. Add some using the form above.</h4>)
  }
  const filteredList = persons.filter(person => person.name.toLowerCase().includes(filteringString.toLowerCase()))
  filteredList.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? true : false)

  return (
    <table>
      <tbody>
        <tr><th>Name</th><th>Phone number</th></tr>
        {filteredList.map(person => <Person key={person.id} person={person} deleteContact={deleteContact}/>)}
      </tbody>
    </table>
  )
}

export default {Person, PersonList}