import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const handleChange = (event) => {
    const filter = event.target.value
    props.filterChange(filter)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div id="filter" style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const ConnectedFilter = connect(
  null,
  { filterChange }
)(Filter)

export default ConnectedFilter