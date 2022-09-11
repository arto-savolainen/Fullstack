import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const DisplayPerson = ({ person, deleteHandler }) => {
  return (
    <div>{person.name} {person.number} <button onClick={() => deleteHandler(person)}>delete</button></div>
  )
}

const DisplayPersons = ({ persons, nameFilter, deleteHandler }) => {
  return (
    <div>
      {persons.filter(x => nameFilter === '' || x.name.toLowerCase().includes(nameFilter.toLowerCase()))
      .map(x => <DisplayPerson key={x.name} person={x} deleteHandler={deleteHandler} />)}
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

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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

    if (persons.some(x => x.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = persons.find(x => x.name === newName)
        updatedPerson.number = newNumber

        personService
          .update(updatedPerson.id, updatedPerson)
          .then(() => {
            setPersons(persons.map(x => {
              if (x.id === updatedPerson.id) {
                return updatedPerson
              }
              else {
                return x
              }
            }))
            setNewName('')
            setNewNumber('')
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
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(x => x.id !== person.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={nameFilter} handler={handleFilterChange} />

      <h2>Add a new</h2>
      <NewPersonForm name={newName} number={newNumber} nameChangeHandler={handleNameChange} numberChangeHandler={handleNumberChange} addNewPersonHandler={addNewPerson} />

      <h2>Numbers</h2>
      <DisplayPersons persons={persons} nameFilter={nameFilter} deleteHandler={deletePerson} />
    </div>
  )
}

export default App