import { useState } from 'react'

const DisplayPerson = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const DisplayPersons = ({ persons, nameFilter }) => {
  return (
    <div>
      {persons.filter(x => nameFilter === '' || x.name.toLowerCase().includes(nameFilter.toLowerCase()))
      .map(x => <DisplayPerson key={x.name} person={x} />)}
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
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '0500'
    },
    { 
      name: 'Arto Savolainen',
      number: 'xxxxxxxxxxx' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setFilter] = useState('')

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
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={nameFilter} handler={handleFilterChange} />

      <h2>Add a new</h2>
      <NewPersonForm name={newName} number={newNumber} nameChangeHandler={handleNameChange} numberChangeHandler={handleNumberChange} addNewPersonHandler={addNewPerson} />

      <h2>Numbers</h2>
      <DisplayPersons persons={persons} nameFilter={nameFilter} />
    </div>
  )
}

export default App