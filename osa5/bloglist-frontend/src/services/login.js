import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  console.log("credentials", credentials)
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }