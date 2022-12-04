import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  let anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  if (filter) {
    anecdotes = anecdotes.filter(x => x.content.toLowerCase().includes(filter.toLowerCase()))
  }

  //Sorting anecdotes directly would count as mutating state so we destructure it to create a copy
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote)
    dispatch(voteAnecdote(anecdote.id))
    dispatch(showNotification(`you voted ${anecdote.content}`))
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList