import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
let notificationTimeoutId
let errorTimeoutId

const Notification = ({ message }) => {
  const notificationStyle = {
    color: "green",
    fontStyle: "bold",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    borderColor: "#008000",
    backgroundColor: "#ebfaeb",
    padding: 8,
    margin: 5
  }

  if (message === null) {
    return null
  }

  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  const errorStyle = {
    color: "red",
    fontStyle: "bold",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    borderColor: "#b30000",
    backgroundColor: "#ffcccc",
    padding: 8,
    margin: 5
  }

  if (message === null) {
    return null
  }

  return (
    <div className="error" style={errorStyle}>
      {message}
    </div>
  )
}

const DisplayPerson = ({ person, deleteHandler }) => {
  return (
    <div>{person.name} {person.number} <button onClick={() => deleteHandler(person)}>delete</button></div>
  )
}

const DisplayPersons = ({ persons, nameFilter, deleteHandler }) => {
  return (
    <div>
      {persons.filter(x => nameFilter === '' || x.name.toLowerCase().includes(nameFilter.toLowerCase()))
      .map(x => <DisplayPerson key={x.id} person={x} deleteHandler={deleteHandler} />)}
    </div>
  )
}

const Filter = ({ filter, handler }) => {
  return (
    <div>
    filter shown with <input value={filter} onChange={handler} />
    </div>
  )
}

const NewPersonForm = (props) => {
  return (
    <form onSubmit={props.addNewPersonHandler}>
      <div> name: <input value={props.name} onChange={props.nameChangeHandler} /></div>
      <div>number: <input value={props.number} onChange={props.numberChangeHandler} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setFilter] = useState('')
  const [notificationText, setNotification] = useState(null)
  const [errorText, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        newErrorMessage(`Something went wrong. Don't ask me what.`)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()

    //Update local persons list first, in case a new person is added from another browser with unrefreshed persons list
    //Gets the whole database every time new entry is added, necessary with this db configuration to prevent duplicate persons
    personService
      .getAll()
      .then(currentPersons => {
        if (currentPersons.some(x => x.name === newName)) {
          if (window.confirm(`${newName} is already added to phonebook, replace old number with ${newNumber}?`)) {
            const updatedPerson = currentPersons.find(x => x.name === newName)
            updatedPerson.number = newNumber

            personService
              .update(updatedPerson.id, updatedPerson)
              .then(() => {
                setPersons(currentPersons.map(x => {
                  if (x.id === updatedPerson.id) {
                    return updatedPerson
                  }
                  else {
                    return x
                  }
                }))

                setNewName('')
                setNewNumber('')
                newNotification(`Replaced the old number of ${updatedPerson.name}. New number is ${updatedPerson.number}`, 8000)
              })
              .catch(error => {
                newErrorMessage(`Information of ${updatedPerson.name} has already been removed from server`)
                setPersons(persons.filter(x => x.id !== updatedPerson.id))
              })
          }

          return
        }

        const newPerson = {
          name: newName,
          number: newNumber
        }

        personService
          .create(newPerson)
          .then(returnedPerson => {
            setPersons(currentPersons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            newNotification(`Added ${newPerson.name} ${newPerson.number}`)
          })
          .catch(error => {
            newErrorMessage(`Something went wrong. Don't ask me what.`)
          })
      })
      .catch(error => {
        newErrorMessage(`Something went wrong. Don't ask me what.`)
      })
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(x => x.id !== person.id))
          newNotification(`Deleted ${person.name}`)
        })
        .catch(error => {
          newErrorMessage(`Information of ${person.name} has already been removed from server`)
          setPersons(persons.filter(x => x.id !== person.id))
        })
    }
  }

  const newNotification = (message, timeout = 6000) => {
    setNotification(message)
    
    if (notificationTimeoutId != null) {
      clearTimeout(notificationTimeoutId)
    }

    notificationTimeoutId = setTimeout(() => {
      setNotification(null)
    }, timeout)
  }

  const newErrorMessage = (message, timeout = 6000) => {
    setErrorMessage(message)

    if (errorTimeoutId != null) {
      clearTimeout(errorTimeoutId)
    }

    errorTimeoutId = setTimeout(() => {
      setErrorMessage(null)
    }, timeout)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage message={errorText} />
      <Notification message={notificationText} />
      <Filter filter={nameFilter} handler={handleFilterChange} />

      <h2>Add a new</h2>
      <NewPersonForm name={newName} number={newNumber} nameChangeHandler={handleNameChange} numberChangeHandler={handleNumberChange} addNewPersonHandler={addNewPerson} />

      <h2>Numbers</h2>
      <DisplayPersons persons={persons} nameFilter={nameFilter} deleteHandler={deletePerson} />
    </div>
  )
}

export default App