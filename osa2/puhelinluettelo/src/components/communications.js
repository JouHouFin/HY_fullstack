import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createPerson = newPersonObject => {
  const request = axios.post(baseUrl, newPersonObject)
  return request.then(response => response.data)
}

const deletePerson = personId => {
  const request = axios.delete(`${baseUrl}/${personId}`)
  return request.then(response => response.data)
}

export default {getPersons: getPersons, createPerson: createPerson, deletePerson: deletePerson};