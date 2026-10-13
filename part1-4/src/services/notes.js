import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

/* axios.get returns a promise object as it asyncrhonously performs
the get request. .then() says when the promise is fulfilled, perform this callback function
In this case of getAll the callback function is between the then() : 'response => response.data"
A callback function is a function that will be performed eventually not synchronously. */
const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    important: true,
  }
  return request.then(response => response.data.concat(nonExisting))
//   return request.then(response => response.data) // still returns a promise (then method of a promise also returns a promise)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { 
  getAll, 
  create, 
  update 
}