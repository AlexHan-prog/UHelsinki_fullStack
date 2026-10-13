const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())

const returnBody = (tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}


app.use(morgan(returnBody))


let phoneBook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (req, res) => {
    res.json(phoneBook)
})

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    const person = phoneBook.find((person) => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.statusMessage = `Could not find person with id ${id}`
        res.status(404).end()
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id
    phoneBook = phoneBook.filter(person => person.id !== id)

    res.status(204).end()
})

const generateId = () => {
    const newId = phoneBook.length > 0 ? Math.max(...phoneBook.map(person => person.id)) : 0
    return String(newId + 1)
}

app.post("/api/persons", (req, res) => {
    const body = req.body
    //console.log(body.name)
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "missing name or number"
        })
    }

    if (phoneBook.find(person => person.name === body.name)) {
        // use status code 400 here because the req format doesn't follow the rules of the server
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    phoneBook = phoneBook.concat(newPerson)

    res.json(newPerson)

})

app.get("/info", (req, res) => {
    const date = new Date()

    const htmlText = `
    <p> Phonebook has info for ${phoneBook.length} people </p>
    <p> ${date.toDateString()} ${date.toTimeString()} </p>
    `
    
    res.send(htmlText)
})




const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`)
})