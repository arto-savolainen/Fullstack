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
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(x => x.id === id)
    await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch(voteForAnecdote(id))
  }
}
 
export default slice.reducer