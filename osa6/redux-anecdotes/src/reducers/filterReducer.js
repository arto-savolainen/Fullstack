import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, action) {
      //state = action.payload THIS DOESN'T WORK
      //Redux Toolkit's createReducer() allows writing reducers that directly mutate the state. This works by wrapping the reducer call with produce from the Immer library.
      //However, the reducer call isn't wrapped with produce when the current state isn't "draftable" by Immer, which is the case for primitive values, including null
      //Remember to return new state in case of strings etc. Mutating state.primitive seems fine though
      return action.payload
    }
  }
})

export const { filterChange } = slice.actions
export default slice.reducer