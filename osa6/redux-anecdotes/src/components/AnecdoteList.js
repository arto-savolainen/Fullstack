import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()
  const timeoutId = useSelector(state => state.notification.timeoutId)

  const vote = (anecdote, timeoutId) => {
    console.log('vote', anecdote)
    dispatch(voteForAnecdote(anecdote.id))

    //createVoteNotification(anecdote.content)
    //React Hook "useSelector" is called in function "createVoteNotification" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter. 
    //can't create a helper function for this
    //this whole thing sucks, how do i move this logic to notification? 
    //what if several components need to call notifications, copy&paste this to every one of them? no! figure out a better way
    const timeout = 5000

    //if previous notification was still showing, clear its timeout so it won't clear current notification prematurely
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)

    dispatch(showNotification([`you voted ${anecdote.content}`, timeoutId]))
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
            <button onClick={() => vote(anecdote, timeoutId)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList