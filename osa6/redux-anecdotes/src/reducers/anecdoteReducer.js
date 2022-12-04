import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const slice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    voteForAnecdote(state, action) {
      const anecdote = state.find(x => x.id === action.payload)
      anecdote.votes++
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, voteForAnecdote, setAnecdotes } = slice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    //I had to create getAnecdote just for this function
    //Seems like an unnecessary and slow workaround
    //How do I access store state from within this function?
    const anecdote = await anecdoteService.getAnecdote(id)
    dispatch(voteForAnecdote(id))
    anecdote.votes++
    await anecdoteService.update(anecdote)
  }
}
 
export default slice.reducer